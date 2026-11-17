window.InitUserScripts = function() {
  window.Script1 = function() {
    var t1 = localStorage.getItem("AntoineChoice") || "(no response saved)";
    var t2 = localStorage.getItem("AntoineResponse") || "(no response saved)";
    var t3 = localStorage.getItem("KellyChoice") || "(no response saved)";
    var t4 = localStorage.getItem("KellyResponse") || "(no response saved)";
    var t5 = localStorage.getItem("RobertChoice") || "(no response saved)";
    var t6 = localStorage.getItem("RobertResponse") || "(no response saved)";
    var t7 = localStorage.getItem("serenityReflectionAnswer1") || "(no response saved)";
    var t8 = localStorage.getItem("serenityReflectionAnswer2") || "(no response saved)";
    var t9 = localStorage.getItem("serenityReflectionAnswer3") || "(no response saved)";


    function loadScript(src, onload) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = onload;
      s.onerror = function() { console.error("Failed to load: " + src); };
      document.head.appendChild(s);
    }

    function buildAndDownload() {
      console.log("[LeaderPDF] buildAndDownload start");
      PDFLib.PDFDocument.create().then(function(pdfDoc) {
        console.log("[LeaderPDF] PDFDocument created");
        return Promise.all([
          pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica),
          pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold)
        ]).then(function(fonts) {
          console.log("[LeaderPDF] fonts embedded");
          var font     = fonts[0];
          var fontBold = fonts[1];
          var margin   = 50;
          var pageW    = 595;
          var pageH    = 842;
          var maxWidth = pageW - margin * 2;
          var lineH    = 17;
          var FOOTER_RESERVE = 70;

          // ✏️ Brand color, derived from 060732
          var NAVY       = PDFLib.rgb(6 / 255, 7 / 255, 50 / 255);
          var NAVY_TINT  = PDFLib.rgb(0.90, 0.90, 0.95);
          var WHITE      = PDFLib.rgb(1, 1, 1);
          var BODY_GRAY  = PDFLib.rgb(0.20, 0.20, 0.22);
          var MUTED_GRAY = PDFLib.rgb(0.45, 0.45, 0.48);

          // ── Form, for the fillable reflection fields ────────────────
          var form = pdfDoc.getForm();
          var fieldCounter = 0;

          var pages = [];

          function addPage() {
            var page = pdfDoc.addPage([pageW, pageH]);
            pages.push(page);
            return page;
          }

          var page = addPage();
          var y = pageH - 60;

          // ── Cover header (page 1 only) ──────────────────────────────
          var today = new Date();
          var dateStr = today.toLocaleDateString("en-GB", {
            day: "2-digit", month: "long", year: "numeric"
          });

          page.drawText("Change Leadership - Leadership through uncertainty", {
            x: margin, y: y, size: 21, font: fontBold, color: NAVY
          });
          y -= 22;
          page.drawText("Change Leadership  ·  Session 4  · Leadership through uncertainty " + dateStr, {
            x: margin, y: y, size: 11, font: font, color: MUTED_GRAY
          });
          y -= 14;
          page.drawLine({
            start: { x: margin, y: y },
            end:   { x: pageW - margin, y: y },
            thickness: 1.2,
            color: NAVY
          });
          y -= 30;

          // ── Wrapped text helper (page-break safe, supports **bold**) ──
          function drawWrapped(text, startY, size, fontRef, color, page) {
            var paragraphs = text.split("\n");
            var curY = startY;
            var spaceWidth = fontRef.widthOfTextAtSize(" ", size);

            function ensureRoom() {
              if (curY < FOOTER_RESERVE) {
                page = addPage();
                curY = pageH - 60;
              }
            }

            function drawLine(lineWords) {
              var x = margin;
              for (var i = 0; i < lineWords.length; i++) {
                var wFont = lineWords[i].bold ? fontBold : fontRef;
                page.drawText(lineWords[i].text, { x: x, y: curY, size: size, font: wFont, color: color });
                x += wFont.widthOfTextAtSize(lineWords[i].text, size) + spaceWidth;
              }
              curY -= lineH;
              ensureRoom();
            }

            for (var p = 0; p < paragraphs.length; p++) {
              var paragraph = paragraphs[p];

              if (paragraph === "") {
                curY -= lineH;
                ensureRoom();
                continue;
              }

              // Split on ** markers: even-index segments are normal, odd-index are bold
              var segments = paragraph.split("**");
              var words = [];
              for (var s = 0; s < segments.length; s++) {
                var isBold = (s % 2 === 1);
                var segWords = segments[s].split(" ");
                for (var w = 0; w < segWords.length; w++) {
                  if (segWords[w].length > 0) {
                    words.push({ text: segWords[w], bold: isBold });
                  }
                }
              }

              var lineWords = [];
              var lineWidth = 0;

              for (var i = 0; i < words.length; i++) {
                var wFont = words[i].bold ? fontBold : fontRef;
                var wWidth = wFont.widthOfTextAtSize(words[i].text, size);
                var addWidth = (lineWords.length > 0 ? spaceWidth : 0) + wWidth;

                if (lineWidth + addWidth > maxWidth && lineWords.length > 0) {
                  drawLine(lineWords);
                  lineWords = [];
                  lineWidth = 0;
                  addWidth = wWidth;
                }

                lineWords.push(words[i]);
                lineWidth += addWidth;
              }

              if (lineWords.length > 0) {
                drawLine(lineWords);
              }
            }

            return { page: page, y: curY };
          }

          // ── Section banner helper ───────────────────────────────────
          function drawSectionBanner(title, page, startY) {
            var bannerH = 26;
            page.drawRectangle({
              x: margin,
              y: startY - bannerH + 6,
              width: maxWidth,
              height: bannerH,
              color: NAVY
            });
            page.drawText(title, {
              x: margin + 10,
              y: startY - bannerH + 14,
              size: 12.5,
              font: fontBold,
              color: WHITE
            });
            return startY - bannerH - 12;
          }

          // ── Fillable reflection box helper ──────────────────────────
          // Draws a label + bordered multiline text field the learner can
          // type into once the PDF is open in Acrobat/Preview/etc.
          function drawReflectionField(label, page, startY, boxHeight) {
            boxHeight = boxHeight || 110;
            var labelSize = 11;

            // Page-break check: need room for label + box + a little breathing room
            if (startY - labelSize - 8 - boxHeight < FOOTER_RESERVE) {
              page = addPage();
              startY = pageH - 60;
            }

            page.drawText(label, {
              x: margin, y: startY, size: labelSize, font: fontBold, color: NAVY
            });

            var boxTop = startY - 8;
            var boxY   = boxTop - boxHeight;

            fieldCounter += 1;
            var fieldName = "reflection_" + fieldCounter;
            var textField = form.createTextField(fieldName);
            textField.enableMultiline();
            // addToPage() must run first — it's what creates the field's
            // default appearance (/DA) stream. setFontSize()/setText() edit
            // that stream, so calling them before addToPage throws
            // "No /DA entry found for field".
            textField.addToPage(page, {
              x: margin,
              y: boxY,
              width: maxWidth,
              height: boxHeight,
              borderColor: NAVY_TINT,
              borderWidth: 1,
              backgroundColor: WHITE
            });
            textField.setFontSize(10.5);
            textField.setText("");

            return { page: page, y: boxY - 22 };
          }

          // ✏️ Update titles, intro text, and reflection prompt to match your exercises
          var exercises = [ 
            {
              title: "Response to Antoine",
              intro: "In this interaction, you responded to a message Antonie had sent. Your response is stored below. The message read: Checking in again. I’m not sure the new target structure is quite hitting the mark. It’s one thing to look at the numbers and decide what customers want, but it’s a little different when you’re actually trying to convince someone to book a holiday. These days, we’re competing with everything from TikTok travel recommendations to influencers showing off a perfect international vacation with miraculously few layovers. I’ve picked up a few things over the years about what really gets customers interested, and sometimes I wonder whether that practical side of the business is getting lost in the decisions we’re making. It’s not always as straightforward as it looks on the outside. Let me know if there’s anything I can do to help you and the team.",
              response: t1
            },
            {
              title: "Antoine's reaction",
              intro: "Antoine replied to your message with the below response.",
              response: t2
            },
            {
              title: "Response to Kelly",
              intro: "In this interaction, you responded to a message Kelly had sent. Your response is stored below. The message read: I’ve been having a few conversations with different people, and I think there are some concerns about the new sales goals that haven’t been properly addressed yet. Everyone is trying to keep up with their bookings, but it’s becoming difficult to manage everything and still give customers the service they deserve. I think the team would appreciate it if these concerns were taken more seriously.",
              response: t3
            },
            {
              title: "Kelly's reaction",
              intro: "Kelly replied to your message with the below response.",
              response: t4
            },
            {
              title: "Response to Robert",
              intro:  "In this interaction, you responded to a message Robert had sent. Your response is stored below. The message read: Thanks for sending through the updated process. I’ve had a look, but I’m going to keep using my usual spreadsheet for now because I know it works and I can keep track of everything this way. I don’t think there’s a difference for the customer, as long as the bookings still get finalised. I’ll let you know if anything comes up.",
              response: t5
            },
            {
              title: "Robert's reaction",
              intro: "Robert replied to your message with the below response.",
              response: t6
            },
            {
              title: "Reflection question 1",
              intro: "How did your chosen responses influence each team member’s willingness to engage with you? What might each person’s response reveal about the underlying reasons for their resistance?",
              response: t7
            },
            {
              title: "Reflection question 2",
              intro: "How can you distinguish between resistance that requires a supportive conversation and resistance that requires further action? Consider how you would balance empathy with accountability, particularly when resistance affects team collaboration or compliance.",
              response: t8
            },
            {
              title: "Reflection question 3",
              intro: "What additional information might you seek before deciding your next steps?",
              response: t9
            }
          ];
// ✏️ Intro section: appears before the question sections.
// Each string in `paragraphs` becomes its own paragraph. Use **double asterisks** for bold.
var introSection = {
  title: "Introduction",
  paragraphs: [
    "In this lesson, you looked at leadership through uncertainty. During organisational change, unexpected events, emerging risks, shifting priorities and incomplete information can make it difficult to predict outcomes or follow an established plan.",
    "You also read through the second case study about Serenity flights. In it, you responded to your teams questions about the recent changes in the company, and reflected on the change process the team has gone through. Your responses are stored below."
    
  ],
  // Label shown above the fillable box under the intro
  fieldLabel: "Your thoughts:"
};

// Page-break check, same threshold the exercise loop uses
if (y < FOOTER_RESERVE + 60) {
  page = addPage();
  y = pageH - 60;
}

y = drawSectionBanner(introSection.title, page, y);

for (var ip = 0; ip < introSection.paragraphs.length; ip++) {
  var paraResult = drawWrapped(introSection.paragraphs[ip], y, 11, font, BODY_GRAY, page);
  page = paraResult.page;   // pick up whichever page we ended on
  y = paraResult.y;
  y -= 8;                   // small gap between paragraphs
}

y -= 6;                     // a little extra space before the text entry label

// Fillable text entry spot under the intro paragraphs
var introField = drawReflectionField(introSection.fieldLabel, page, y, 110);
page = introField.page;
y = introField.y;

y -= 14; 
          for (var e = 0; e < exercises.length; e++) {
            var ex = exercises[e];

            if (y < FOOTER_RESERVE + 60) {
              page = addPage();
              y = pageH - 60;
            }

            y = drawSectionBanner(ex.title, page, y);

            // Intro paragraph — plain body text, sits above the learner's response
            if (ex.intro) {
              var introResult = drawWrapped(ex.intro, y, 11, font, MUTED_GRAY, page);
              page = introResult.page;
              y = introResult.y;
              y -= 14;
            }

            var result = drawWrapped(ex.response, y, 11.5, font, BODY_GRAY, page);
            page = result.page;   // pick up whichever page we ended on
            y = result.y;

            y -= 20;

            // Fillable reflection box for the learner, right under their answer
            var reflectionResult = drawReflectionField(
              "Your reflection on this response:", page, y, 110
            );
            page = reflectionResult.page;
            y = reflectionResult.y;

            y -= 14;

            if (y < FOOTER_RESERVE && e < exercises.length - 1) {
              page = addPage();
              y = pageH - 60;
            }
          }

          // Make sure the typed-in text actually renders when viewed,
          // even in readers that don't auto-generate field appearances.
          form.updateFieldAppearances(font);

          // ── Footer pass: thin rule + "Page X of Y" on every page ───
          var total = pages.length;
          for (var p = 0; p < total; p++) {
            var pg = pages[p];
            pg.drawLine({
              start: { x: margin, y: 46 },
              end:   { x: pageW - margin, y: 46 },
              thickness: 0.75,
              color: NAVY_TINT
            });
            var label = "Page " + (p + 1) + " of " + total;
            var labelSize = 9;
            var labelWidth = font.widthOfTextAtSize(label, labelSize);
            pg.drawText(label, {
              x: pageW - margin - labelWidth,
              y: 32,
              size: labelSize,
              font: font,
              color: MUTED_GRAY
            });
            pg.drawText("Change Leadership Session 4 Leadership through uncertainty ", {
              x: margin,
              y: 32,
              size: labelSize,
              font: font,
              color: MUTED_GRAY
            });
          }

          return pdfDoc.save().then(function(pdfBytes) {
            console.log("[LeaderPDF] pdfBytes ready, length:", pdfBytes.length);
            var blob = new Blob([pdfBytes], { type: "application/pdf" });
            var url  = URL.createObjectURL(blob);
            var a    = document.createElement("a");
            a.href     = url;
            a.download = "Change Leadership Session 4 Leadership through uncertainty AIM.pdf";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            console.log("[LeaderPDF] download triggered");
            setTimeout(function() {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }, 5000);
          });
        });
      }).catch(function(err) {
        console.error("[LeaderPDF] PDF build error:", err);
      });
    }

    console.log("[LeaderPDF] Script1 invoked, PDFLib defined?", typeof PDFLib !== "undefined");
    if (typeof PDFLib !== "undefined") {
      buildAndDownload();
    } else {
      loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.16.0/pdf-lib.min.js",
        function() {
          console.log("[LeaderPDF] pdf-lib loaded from CDN");
          buildAndDownload();
        }
      );
    }
  };
};
window.InitUserScripts();
window.Script1();