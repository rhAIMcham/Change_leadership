window.InitUserScripts = function() {
  window.Script1 = function() {
var q1 = localStorage.getItem("AIforproductivity1") || "(no response saved)";
    var q2 = localStorage.getItem("AIforproductivity2") || "(no response saved)";
    var q3 = localStorage.getItem("AIforproductivity3") || "(no response saved)";
    var q4 = localStorage.getItem("AIforproductivity4") || "(no response saved)";
    var q5 = localStorage.getItem("AIforproductivity5") || "(no response saved)";
    var q6 = localStorage.getItem("AIforproductivity6") || "(no response saved)";
    var q7 = localStorage.getItem("AIforproductivity7") || "(no response saved)";
    var q8 = localStorage.getItem("AIforproductivity8") || "(no response saved)";
    var q9 = localStorage.getItem("AIforproductivity9") || "(no response saved)";
    var q10 = localStorage.getItem("AIforproductivity10") || "(no response saved)";
    var q11 = localStorage.getItem("AIforproductivity11") || "(no response saved)";
    var q12 = localStorage.getItem("AIforproductivity12") || "(no response saved)";
    var q13 = localStorage.getItem("AIforproductivity13") || "(no response saved)";
    var q14 = localStorage.getItem("AIforproductivity14") || "(no response saved)";
    var q15 = localStorage.getItem("AIforproductivity15") || "(no response saved)";
    var q16 = localStorage.getItem("AIforproductivity16") || "(no response saved)";
    var q17 = localStorage.getItem("AIforproductivity17") || "(no response saved)";
    var q18 = localStorage.getItem("AIforproductivity18") || "(no response saved)";
    var q19 = localStorage.getItem("AIforproductivity19") || "(no response saved)";
    var q20 = localStorage.getItem("AIforproductivity20") || "(no response saved)";
    var q21 = localStorage.getItem("AIforproductivity21") || "(no response saved)";
    var q22 = localStorage.getItem("AIforproductivity22") || "(no response saved)";
    var q23 = localStorage.getItem("AIforproductivity23") || "(no response saved)";
    var q24 = localStorage.getItem("AIforproductivity24") || "(no response saved)";
    var q25 = localStorage.getItem("AIforproductivity25") || "(no response saved)";
    var q26 = localStorage.getItem("AIforproductivity26") || "(no response saved)";
    var q27 = localStorage.getItem("AIforproductivity27") || "(no response saved)";
    var q28 = localStorage.getItem("AIforproductivity28") || "(no response saved)";
    var q29 = localStorage.getItem("AIforproductivity29") || "(no response saved)";
    var q30 = localStorage.getItem("AIforproductivity30") || "(no response saved)";
    var q31 = localStorage.getItem("AIforproductivity31") || "(no response saved)";
    var q32 = localStorage.getItem("AIforproductivity32") || "(no response saved)";
    var q33 = localStorage.getItem("AIforproductivity33") || "(no response saved)";
    var q34 = localStorage.getItem("AIforproductivity34") || "(no response saved)";
    var q35 = localStorage.getItem("AIforproductivity35") || "(no response saved)";
    var q36 = localStorage.getItem("AIforproductivity36") || "(no response saved)";
    var q37 = localStorage.getItem("AIforproductivity37") || "(no response saved)";
    var q38 = localStorage.getItem("AIforproductivity38") || "(no response saved)";
    var q39 = localStorage.getItem("AIforproductivity39") || "(no response saved)";
    var q40 = localStorage.getItem("AIforproductivity40") || "(no response saved)";
    var q41 = localStorage.getItem("AIforproductivity41") || "(no response saved)";
    var q42 = localStorage.getItem("AIforproductivity42") || "(no response saved)";
    var q43 = localStorage.getItem("AIforproductivity43") || "(no response saved)";
    var q44 = localStorage.getItem("AIforproductivity44") || "(no response saved)";
    var q45 = localStorage.getItem("AIforproductivity45") || "(no response saved)";
    var q46 = localStorage.getItem("AIforproductivity46") || "(no response saved)";
    var q47 = localStorage.getItem("AIforproductivity47") || "(no response saved)";
    var q48 = localStorage.getItem("AIforproductivity48") || "(no response saved)";
    var q49 = localStorage.getItem("AIforproductivity49") || "(no response saved)";
    var q50 = localStorage.getItem("AIforproductivity50") || "(no response saved)";
    var q51 = localStorage.getItem("AIforproductivity51") || "(no response saved)";

    function loadScript(src, onload) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = onload;
      s.onerror = function() { console.error("Failed to load: " + src); };
      document.head.appendChild(s);
    }

    function buildAndDownload() {
      PDFLib.PDFDocument.create().then(function(pdfDoc) {
        Promise.all([
          pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica),
          pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold)
        ]).then(function(fonts) {
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

          page.drawText("New Leader Session 3 AIM", {
            x: margin, y: y, size: 21, font: fontBold, color: NAVY
          });
          y -= 22;
          page.drawText("New leader programme  ·  Session 3  ·  " + dateStr, {
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

          // ✏️ Update titles to match your exercises
          var exercises = [
            { title: "What are you hoping to learn during this course? What concerns do you have about AI?", response: q1 },
            { title: "List three tasks that regularly eat your time, and use the goal/tool table above to identify a possible tool type.", response: q2 },
            { title: "Which of your three tasks would you trust AI with today, and which would you still want to do yourself? What's actually driving that decision - AI capability or risk?", response: q3 },
            { title: "Which parts of my role is AI likely to absorb?", response: q4 },
            { title: "Which parts of my role will stay mine, and why?", response: q5 },
            { title: "What is the first skill I'll work on this month?", response: q6 },
            { title: "Which phrases sounds like a filler (e.g. vague, inflated language that says nothing new)?", response: q7 },
            { title: "What is the one statistic or claim that you can’t verify, or that sounds wrong?", response: q8 },
            { title: "Where is the response tone not suitable to a stakeholder audience?", response: q9 },
            { title: "Did the refined version fix all three issues? Is there anything still missing?", response: q10 },
            { title: "Recognise the source: select one claim. What is it based on and does the output say?", response: q11 },
            { title: "Evaluate the tone: is it more confident than the evidence justifies?", response: q12 },
            { title: "Authenticate the claims: can you verify the specific facts, figures and citations independently?", response: q13 },
            { title: "Decide: will you accept, revise or discard this output? Why?", response: q14 },
            { title: "What is the role and perspective?", response: q15 },
            { title: "What is the goal and audience?", response: q16 },
            { title: "What are the constraints?", response: q17 },
            { title: "What is the success criteria?", response: q18 },
            { title: "What is the context-engineered prompt in full?", response: q19 },
            { title: "Write down a plain-paragraph prompt. Preferably one you've used for a real task, from any part of your week.", response: q20 },
            { title: "Break it into role, task, constraints and output format. Rewrite it using XML tags by following the template above.", response: q21 },
            { title: "What changed in the output once the prompt was tagged?", response: q22 },
            { title: "What is AI’s proposed plan?", response: q23 },
            { title: "What gaps did AI find? What did you ask it change and why?", response: q24 },
            { title: "What will you check once the output is applied? Which of the 3 steps took the longest?", response: q25 },
            { title: "What approach is worth pursing and why?", response: q26 },
            { title: "Note down the Productivity need, Tool/approach, Example use, Risk level and Review step.", response: q27 },
            { title: "What was changed as a results of reviewing the AI output?", response: q28 },
            { title: "What was the biggest difference between the audience versions?", response: q29 },
            { title: "Which were safe to send after a quick check verses those that needed more scrutiny?", response: q30 },
            { title: "What was the total time spent, including your own review, against the 30 minute deadline?", response: q31 },
            { title: "What formula or approach was suggested?", response: q32 },
            { title: "What trends or patterns were identified?", response: q33 },
            { title: "What is one thing you would verify before using the output?", response: q34 },
            { title: "What were the key points, risks or decisions identified?", response: q35 },
            { title: "Apply READ (Recognise, Evaluate, Authenticate, Decide). Which follow-up questions need answering and what would you change or dispute?", response: q36 },
            { title: "What categories did AI identify? What was reordered or disputed?", response: q37 },
            { title: "What issues with the original AI pitch notes did you need to address?", response: q38 },
            { title: "From the outline generated, what is one change to make before using it?", response: q39 },
            { title: "Which slide needed the most editing, and why? What does that tell you about where your judgement adds the most value?", response: q40 },
            { title: "What was the style, tone etc. that you chose to specify?", response: q41 },
            { title: "Which variation did you choose and why?", response: q42 },
            { title: "What recurrent tasks did AI list that you actually experience?", response: q43 },
            { title: "Align your tasks to either Automate, Assist or Avoid?", response: q44 },
            { title: "What is your agent's goal, trigger and boundary?", response: q45 },
            { title: "What was the final version of your custom instructions? What was the output?", response: q46 },
            { title: "Where will yours live?", response: q47 },
            { title: "When is your review point? What did the first test run get wrong and what instructions fixed it? What would make you stop trusting this agent's output?", response: q48 },
            { title: "What is the output plan after running the prompt?", response: q49 },
            { title: "What was useful and what needed changing with what was built?", response: q50 },
            { title: "Your productivity plan.", response: q51 }           
          ];

          for (var e = 0; e < exercises.length; e++) {
            var ex = exercises[e];

            if (y < FOOTER_RESERVE + 60) {
              page = addPage();
              y = pageH - 60;
            }

            y = drawSectionBanner(ex.title, page, y);

            var result = drawWrapped(ex.response, y, 11.5, font, BODY_GRAY, page);
            page = result.page;   // pick up whichever page we ended on
            y = result.y;

            y -= 26;

            if (y < FOOTER_RESERVE && e < exercises.length - 1) {
              page = addPage();
              y = pageH - 60;
            }
          }

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
            pg.drawText("New leader program", {
              x: margin,
              y: 32,
              size: labelSize,
              font: font,
              color: MUTED_GRAY
            });
          }

          pdfDoc.save().then(function(pdfBytes) {
            var blob = new Blob([pdfBytes], { type: "application/pdf" });
            var url  = URL.createObjectURL(blob);
            var a    = document.createElement("a");
            a.href     = url;
            a.download = "New Leader Session 3 AIM.pdf";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }, 5000);
          });
        });
      }).catch(function(err) {
        console.error("PDF build error:", err);
      });
    }

    if (typeof PDFLib !== "undefined") {
      buildAndDownload();
    } else {
      loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.16.0/pdf-lib.min.js",
        function() { buildAndDownload(); }
      );
    }
  };
};
window.InitUserScripts();
window.Script1();
