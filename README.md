# Fun Price Comparison App
![ezgif-8a6c5e95532531](https://github.com/user-attachments/assets/08b6c390-1118-4f3e-b429-33fceae2de8b)

This is a **just-for-fun** Expo app built for time pass! The app fetches product price data from multiple platforms like **Zepto**, **Blinkit**, **Instamart**, and **BigBasket** using the API provided by [quickcompare.com](https://quickcompare.com). It displays prices for the same product across these platforms, making it a quirky little tool to compare prices conveniently. Keep in mind, this app is primarily functional in **India**, as the supported platforms operate only in this region.

## Features
- Compare product prices across platforms like Zepto, Blinkit, Instamart, and BigBasket.
- A simple interface to search for products and view prices.
- Requires location permissions as it fetches location-specific data from the APIs.

## Prerequisites
To run this app, ensure you have the following:
- [Node.js](https://nodejs.org/) installed.
- [Expo CLI](https://docs.expo.dev/) installed globally.
- The [Expo Go app](https://expo.dev/client) installed on your mobile device (available on iOS and Android).
- An active internet connection.

---

## Getting Started

### 1. Clone the Repository
First, clone the repository to your local machine using Git:
```bash
git clone https://github.com/Lonka-Pardhu/DealFinder.git
```
Replace `Lonka-Pardhu` and `DealFinder` with your actual GitHub username and repository name.

### 2. Navigate to the Project Folder
```bash
cd DealFinder
```

### 3. Install Dependencies
Install the required packages by running:
```bash
npm install
```

### 4. Start the App
Run the following command to start the Expo development server:
```bash
npx expo start
```

### 5. Open the App on Your Device
- Scan the QR code shown in your terminal or browser using the **Expo Go app** on your mobile device.

### 6. Grant Location Permissions
The app requires location permissions to fetch region-specific data from the API. Make sure to grant location access when prompted.

### 7. Search for Products
Once the app is running:
- Use the search bar to type in the name of a product.
- View and compare prices from **Zepto**, **Blinkit**, **Instamart**, and **BigBasket**.

---

## Notes
- This app is for **fun and experimental purposes only**. It uses [quickcompare.in](https://quickcompare.in) 's API.
- The app might not work properly outside **India**, as the platforms it fetches data from primarily operate in India.
- Data accuracy depends on the API's responses, and there might be some delays or inconsistencies.
- The app uses [Legend List](https://www.legendapp.com/open-source/list/intro/introduction/) to efficiently render items in the product list.


