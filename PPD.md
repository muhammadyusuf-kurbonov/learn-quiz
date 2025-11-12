# **Project Description Document (PDD)**

## **Project Title:** **QuizForge – Intelligent Content-to-Quiz Generator**

---

## **1. Project Overview & Goal**

### **Application Name**

**QuizForge** – Intelligent Content-to-Quiz Generator

### **Problem Statement**

Educators, students, and corporate trainers frequently face the time-consuming and error-prone task of creating quizzes from existing study material, documents, or lecture notes. Manually identifying key ideas and writing questions requires substantial effort and subject-matter focus. This process is inefficient, especially when frequent assessments are needed for adaptive learning or review.

### **Primary Goal**

QuizForge’s goal is to **instantly transform any textual content (PDF, DOCX, TXT, or pasted text)** into a **customizable, accurate, and multi-format quiz**. By leveraging language models and natural language processing (NLP), the system automatically identifies key concepts, generates diverse question types, and provides an editable, exportable quiz with answer keys.

---

## **2. Target Audience & Use Case**

### **Target Audience**

* **Educators & Teachers** – Generate classroom quizzes from lecture notes or textbooks.
* **Students** – Create self-assessment materials from study notes.
* **Corporate Trainers** – Build employee knowledge checks from training manuals or policy documents.
* **E-learning Platforms** – Integrate automated quiz generation into content workflows.

### **Key Use Case Example**

A high-school teacher uploads a **20-page PDF** of lecture notes covering "Photosynthesis." Within seconds, QuizForge:

1. Extracts and processes the text.
2. Identifies major concepts, terms, and relationships.
3. Generates a **15-question quiz** containing:

   * 9 Multiple Choice Questions (MCQs)
   * 4 True/False questions
   * 2 Short Answer questions
4. Displays both questions and verified answers, ready for export as a PDF or plain text.

---

## **3. Functional Requirements (The “What”)**

### **3.1 Input Handling**

* **Supported Input Types:**

  * Plain text (via text box paste)
  * File uploads: **PDF**, **DOCX**, **TXT**
* **File Size Limit:** 10 MB per file (configurable)
* **Extraction & Parsing:**

  * **PDFs:** Parsed using `pdfplumber` or `PyMuPDF`
  * **DOCX:** Parsed using `python-docx`
  * **TXT:** Direct ingestion
* **Preprocessing:**

  * Remove non-text elements (headers, page numbers)
  * Segment text into logical paragraphs and sections for semantic analysis

---

### **3.2 Quiz Generation Engine**

#### **Core Logic**

The engine performs:

1. **Text preprocessing** → clean, tokenize, and summarize key concepts.
2. **Concept extraction** → identify important nouns, verbs, definitions, and cause-effect pairs.
3. **Prompt formation** → structured prompt sent to an LLM for quiz generation.
4. **Validation** → ensure consistent format and presence of answer keys.

#### **Question Types**

* **Multiple Choice Questions (MCQs)**

  * 1 correct answer + 3 distractors
  * Balanced difficulty and coverage
* **True/False Questions**

  * Derived from key factual statements
* **Short Answer Questions**

  * Conceptual, one-sentence response expected

#### **Answer Key**

* Each question includes:

  * `question_text`
  * `options` (for MCQs)
  * `correct_answer`
  * `explanation` (optional)

#### **Example JSON Output Schema**

```json
{
  "quiz_title": "Generated Quiz: [Topic]",
  "questions": [
    {
      "type": "MCQ",
      "question_text": "What is the main function of chlorophyll in photosynthesis?",
      "options": ["Absorb sunlight", "Release oxygen", "Transport water", "Store starch"],
      "correct_answer": "Absorb sunlight",
      "difficulty": "Medium"
    },
    {
      "type": "True/False",
      "question_text": "Photosynthesis occurs only during the night.",
      "correct_answer": "False",
      "difficulty": "Easy"
    },
    {
      "type": "Short Answer",
      "question_text": "Explain the role of carbon dioxide in photosynthesis.",
      "correct_answer": "It serves as the carbon source for glucose production.",
      "difficulty": "Medium"
    }
  ]
}
```

---

### **3.3 User Customization**

| Parameter             | Description                                       | Example   |
| --------------------- | ------------------------------------------------- | --------- |
| **Question Count**    | Total number of generated questions               | 5, 10, 20 |
| **Difficulty Level**  | “Easy”, “Medium”, “Hard”                          | Medium    |
| **Question Type Mix** | Ratio or count of MCQ / True/False / Short Answer | 60/30/10  |

* Validation ensures total percentages = 100%.
* Option for “Auto Mix” where the system balances types based on content density.

---

### **3.4 Quiz Display & Export**

* **Display:**

  * Clean layout (question + answer key toggle)
  * Option to edit any question inline before export
* **Export Options:**

  * **PDF** (using `pdfkit` or `WeasyPrint`)
  * **TXT** (plain text format)
  * Optional: **Copy to Clipboard**

---

## **4. User Flow & Interface (UX/UI)**

### **Step 1: Upload/Paste Content Screen**

* **UI Elements:**

  * Drag-and-drop upload area
  * Textarea for manual paste
  * “Next” button (disabled until input validated)
* **Error Handling:**

  * Invalid file format
  * Empty text input

---

### **Step 2: Configuration Screen**

* **UI Elements:**

  * Numeric field: “Number of Questions”
  * Dropdown: “Difficulty Level” (Easy/Medium/Hard)
  * Sliders or fields for question type ratios
  * “Generate Quiz” button
* **Logic:**

  * Client-side validation of configuration
  * Sends request payload to backend API `/generate-quiz`

---

### **Step 3: Generation & Review Screen**

* **UI Elements:**

  * Progress/loading indicator (“Analyzing content…”)
  * Once ready: Display generated quiz
  * Expand/collapse answer keys
* **Features:**

  * Inline edit for each question
  * Regenerate specific question
  * Summary stats (e.g., 10 questions generated, 3 types)

---

### **Step 4: Action/Export Screen**

* **Buttons:**

  * “Edit Quiz”
  * “Print”
  * “Export as PDF”
  * “Export as TXT”
* **Optional:**

  * Share via link (future integration)

---

## **5. Technical Requirements & Constraints (The “How”)**

### **5.1 Technology Stack (Proposed)**

| Layer             | Technology                         | Description                            |
| ----------------- | ---------------------------------- | -------------------------------------- |
| **Frontend**      | React (Vite) or Vue 3              | Fast SPA, responsive design            |
| **Backend**       | Python (FastAPI)                   | Lightweight, async-ready API framework |
| **Database**      | SQLite (MVP) → Postgres (scalable) | Stores quiz metadata and logs          |
| **Storage**       | Local or S3-compatible             | For temporary file uploads             |
| **Auth (future)** | JWT-based                          | For user accounts and history          |
| **Deployment**    | Docker + Nginx reverse proxy       | Production-ready containerization      |

---

### **5.2 Data Processing**

* **File Parsing:**

  * PDF: `pdfplumber`, `PyMuPDF`
  * DOCX: `python-docx`
  * TXT: Direct string ingestion
* **Text Cleaning:**

  * Remove line breaks, headers, page numbers
  * Convert to plain UTF-8 text
* **Chunking:**

  * Split text into chunks (~1000 tokens each) for LLM processing
  * Overlap chunks slightly to preserve context continuity

---

### **5.3 AI/LLM Integration**

#### **LLM Providers**

* **OpenAI GPT-4/5**, **Anthropic Claude**, or **Google Gemini**
* Configurable API key via environment variables

#### **Prompt Specification**

**Example Prompt Template:**

```
You are an expert quiz generator.
Given the following content, create a quiz in JSON format.
Follow these rules strictly:

1. Include a variety of question types: Multiple Choice, True/False, Short Answer.
2. Respect the requested difficulty: {{difficulty}}.
3. Limit total number of questions to {{question_count}}.
4. Maintain JSON structure with fields: type, question_text, options (if any), correct_answer, difficulty.

CONTENT:
{{text_chunk}}
```

#### **Expected Output Format**

LLM must return **valid JSON** as defined in section 3.2. The backend validates structure and merges multi-chunk outputs before serving to frontend.

---

### **5.4 API Endpoints**

| Method | Endpoint         | Description          | Input                  | Output           |
| ------ | ---------------- | -------------------- | ---------------------- | ---------------- |
| `POST` | `/upload`        | Uploads file or text | file/text              | text_id          |
| `POST` | `/generate-quiz` | Generates quiz       | text_id, config params | JSON quiz object |
| `GET`  | `/export/:id`    | Export quiz          | quiz_id                | PDF/TXT          |
| `GET`  | `/health`        | Service health check | —                      | status           |

---

### **5.5 Security & Constraints**

* File scanning to prevent malicious uploads
* Rate-limiting per IP or API key
* CORS configuration for web client access
* Logging for LLM requests and errors

---

## **6. Future Scope**

* **User Authentication & History:**
  Store user-generated quizzes, allow versioning, and personal dashboards.
* **Flashcard Generation Mode:**
  Auto-create flashcards from the same input text.
* **Multimedia Input:**
  Transcribe audio/video lectures and generate quizzes.
* **Adaptive Learning:**
  Adjust question difficulty dynamically based on user performance.
* **Integrations:**

  * LMS (Moodle, Canvas)
  * Google Classroom
  * Quiz API endpoints for 3rd-party apps

---

## **7. Summary / Action Plan**

| Phase       | Task                | Deliverables                                   |
| ----------- | ------------------- | ---------------------------------------------- |
| **Phase 1** | Core MVP            | File upload → Quiz generation → PDF/TXT export |
| **Phase 2** | Customization UI    | Difficulty, type ratios, count                 |
| **Phase 3** | Polishing           | Inline editing, regenerated questions          |
| **Phase 4** | Deployment          | Dockerized app + hosted demo                   |
| **Phase 5** | Future Enhancements | Auth, flashcards, multimedia input             |

---

✅ **This document serves as the definitive project blueprint** for an autonomous AI development agent to implement **QuizForge**, ensuring clarity in functionality, architecture, and operational behavior from start to finish.
