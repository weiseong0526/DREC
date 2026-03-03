# Prince Paw - Pet Shampoo E-commerce

Premium dog & cat shampoo e-commerce website. Hosted on **Google Firebase**.

## How to Deploy (Google Firebase Hosting)

1. **Install Firebase CLI** (one-time)
   ```bash
   npm install -g firebase-tools
   ```

2. **Log in to Google**
   ```bash
   firebase login
   ```

3. **Create a Firebase project** (if needed)
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" → name it "princepaw" (or any name)
   - If you use a different name, edit `.firebaserc` and change `"princepaw"` to your project ID

4. **Deploy from the princepaw folder**
   ```bash
   cd c:\xampp\htdocs\princepaw
   firebase deploy
   ```

5. **Your site will be live at:**
   - `https://princepaw.web.app` (or `https://YOUR-PROJECT-ID.web.app`)
   - `https://princepaw.firebaseapp.com` (or `https://YOUR-PROJECT-ID.firebaseapp.com`)

## Test Locally (optional)

```bash
firebase serve
```
Then open **http://localhost:5000** in your browser.

## Site Structure

- **index.html** - Homepage with hero image and filter buttons
- **products/** - Product pages for each category
- **css/style.css** - Styles

## Color Palette

- `#1F1610` - Main dark
- `#957142` - Warm copper
- `#F2C552` - Golden
- `#F9F4DC` - Light cream
