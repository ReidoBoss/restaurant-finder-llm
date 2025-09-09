# Project Setup

## Prerequisites

- **Node.js**: v21 or higher
- **API Keys**:
  - **Gemini API Key** → [Setup Instructions](https://ai.google.dev/gemini-api/docs)
  - **Foursquare API Key** → [Setup Instructions](https://docs.foursquare.com/developer/reference/places-api-get-started)

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the project root**

4. **Add the required environment variables**

   ```env
   # in the .env.example file
    GEMINI_API_KEY=<YOUR-GEMENI-API-KEY>
    FSQR_RESTAURANT_FINDER_KEY=<YOUR-FSQR-SERVICE-API-KEY>

    # PORT
    PORT=3000 # or what ever you like

    # allowed codes, separated by comma
    ALLOWED_CODES=pioneerdevai,testcode,test-code
   ```

5. **Run the project locally**
   ```bash
   npm run dev
   ```

---

## Configuration Notes

- The `.env` file must be created manually in the root folder.
- Ensure API keys are valid and active for the project to function properly.

---

## Assumptions Made

- Users without premium access cannot query premium-only fields.
- The solution assumes only free-tier fields are guaranteed to be available.

---

## Challenges Encountered

- The API endpoint specified in the instructions was deprecated and no longer working.
- Required finding and adapting to the latest Foursquare API documentation.
- Premium-only fields (`rating`, `price`, and `hours`) were missing in free tier, so they were made **optional** in Zod validation.

---

## Limitations

- Users with **premium accounts** can access additional fields (`rating`, `price`, `hours`).
- Free-tier users cannot access these fields.
- Reference to premium fields: [Foursquare Premium Fields](https://docs.foursquare.com/fsq-developers-places/reference/response-fields#places-premium)
