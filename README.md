# PS2 Survival Horror Classics [![Demo: Online](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://madebynomad.dev/ps2-horror)

This React Game Library App showcases a collection of classic survival horror games for the PlayStation 2 (PS2). It allows users to keep track of their gaming progress, manage their wishlist, and explore a curated list of iconic titles from the survival horror genre. The app provides interactive features for adding, rating, and marking games as played or wished.

It's component-based architecture serves to create modular, reusable, and self-contained UI elements. Each functional piece, from the navigation bar to individual game items, is encapsulated as a component, enabling easy maintenance and scalability. It dynamically renders components based on conditions, presenting users with relevant information and controls. Other dynamic data, such as play counts, search queries, and item states, are tracked and updated seamlessly to ensure real-time responsiveness. This reactive approach ensures that the UI remains in sync with the underlying data and minimizes unnecessary re-renders. 

Careful event handling enhances user engagement with UI updates and ensures consistent behavior across different user interactions. The semantic structure of the application and proper markup adheres to HTML5 and WCAG standards, promoting accessibility and providing search engine optimization. CSS classes are dynamically modified to reflect changes in the app's state. The app's visual design centers around simplicity, promoting effortless navigation and engagement. The minimalist approach helps to reduces clutter and distractions, allowing users to focus on essential information and interactions.

## Screenshots

<img src="screenshot--desktop.webp" alt="Desktop Screenshot" width="100%">
<p float="left">
    <img src="screenshot--tablet.webp" alt="Tablet Screenshot" width="61%">
    <img src="screenshot--add-form.webp" alt="Add Form Screenshot" width="36.7%">
</p>

## Getting Started
You can follow these steps to set up and run the app on your local machine.<br>
Make sure you have Node.js installed. You can download it from the [official website](https://nodejs.org).
```bash
# 1. Clone the Repository
git clone https://github.com/vladnomad/ps2-horror.git

# 2. Navigate to the Project Directory
cd ps2-horror

# 3. Install Project Dependencies
npm install

# 4. Start the Development Server
npm start
```

## Methodologies
- **Component Reusability**
- **State Management**
- **Event Handling**
- **Conditional Rendering**
- **Dynamic Styling**

## Features

### Game List and Filtering
The game list showcases an array of PS2 survival horror titles, accompanied by pertinent metadata like ratings and icons denoting play and wishlist status. This carefully designed layout ensures that users can quickly scan through the list and identify relevant information. Users can selectively filter the list to display played games, wishlist items, or the entire collection. This feature allows users to focus on specific subsets of the game library, enhancing usability for users with varied preferences.

### Intuitive Search Mechanism
The search bar enables users to search for specific games by title. The list dynamically updates to display matching results as users type, leveraging real-time feedback. This instant feedback enhances the search experience and helps users find games efficiently.

### Interactive Gameplay Tracking
A progress bar visually represents the percentage of games played within the collection. This interactive element intends to encourage engagement and exploration of the entire collection.

### Marking Played Games and Wishlist
Users have the ability to mark games as played or add them to their wishlist with intuitive buttons, providing a straightforward way to manage their collection, while icons are used to indicate changes.

### Streamlined Game Addition
The "Add Game" feature allows users to include new games in the library. Upon opening a menu with a form, the users are prompted to input the title and rating of the new game. The form includes validation and error messages to ensure completeness and accuracy of the input.

### UI/UX Integration
The user interface embodies an intuitive design, ensuring users promptly comprehend the functionality and purpose of each element. Clear labels, tooltips, and visual cues guide users through the app, minimizing the learning curve. Interactive elements, including buttons and icons, offer instant visual and tactile feedback upon engagement. This feedback enhances user confidence and responsiveness, contributing to a satisfying user experience. The app prioritizes seamless and responsive interactions, employing visual cues to highlight changes and status updates. Smooth transitions and animations ensure that users are informed about changes in the app's state, enhancing user engagement.

## Future Improvements
I am committed to improving the PS2 Survival Horror Classics Game Library App to provide an even better user experience. Here are some potential future enhancements I'm considering:

- **Integration with IGDB API** <br> 
I'm exploring the possibility of integrating with the IGDB (Internet Game Database) API to enrich the game addition process by selecting games by title from the database and fill added games with relevant metadata and cover images.
- **User Accounts and Syncing** <br>
I'm also considering implementing user accounts, enabling users to create profiles, save their progress, and synchronize their collections across different devices.
- **Rating Sorting** <br>
This enhancement would enable users to quickly identify and access the highest-rated games in their collection, enhancing their gameplay experience.

## Acknowledgments
I extend my heartfelt gratitude to the developers of the iconic PS2 survival horror classics, whose dedication has left an indelible mark on the gaming world. Survival horror on the PS2 transcended mere entertainment, becoming an artistic expression that pushed the boundaries of storytelling, audiovisual design, and emotional engagement. The intricate environments, psychological tension, and spine-tingling soundscapes pushed players to the edge of their seats, delivering an adrenaline-fueled thrill like never before. The legacy of these classics endures as a testament to the power of interactive storytelling and the enduring impact that games can have on our lives.

## License
This project is licensed under the [GNU General Public License v3.0](LICENSE). It is a copyleft license that ensures the software remains open-source and freely available. It requires derivative works to be released under the same license and mandates source code availability. Any software that links to this code may also need to adhere to the GPL v3.0. Please review the LICENSE file for full details.