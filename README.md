# URL Shortener

The **URL Shortener** is a simple web application that allows users to shorten long URLs using the **Bitly API**. It provides basic CRUD (Create, Read, Update, Delete) operations for managing shortened URLs.

## Features
- **Shorten long URLs using Bitly API**
- **Copy shortened URL with a single click**
- **Edit and update shortened URLs**
- **Delete unwanted shortened URLs**
- **Simple and user-friendly interface**

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **API Integration:** Bitly API
- **Local Storage:** To manage stored links

## Installation & Setup
### Prerequisites:
- A Bitly API Key (Sign up at [Bitly](https://bitly.com))

### Steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```
2. Open `index.html` in your browser.
3. Replace `YOUR_BITLY_API_KEY` in `script.js` with your actual Bitly API key.

## Project Structure
```
url-shortener/
│── index.html    # Main UI
│── style.css     # Styling
│── script.js     # API calls and CRUD operations
```

## API Usage
- **Shorten URL:** Calls Bitly API to generate a short URL.
- **Edit URL:** Allows users to modify the stored long URL.
- **Delete URL:** Removes the URL from the stored list.

## Usage
1. Enter a long URL in the input field.
2. Click the **Shorten** button.
3. The shortened URL appears with a **Copy** button.
4. Users can view, edit, or delete shortened links in the list.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For queries or collaborations, feel free to reach out:
📧 venerablevignesh@gmail.com

