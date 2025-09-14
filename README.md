# Project Documentation

This document provides a comprehensive overview of the codebase, outlining the technologies used, architectural decisions, and state management strategies.

## Table of Contents

-   [Tech Stack](#tech-stack)
-   [Architecture and Tradeoffs](#architecture-and-tradeoffs)
-   [Redux State Management](#redux-state-management)
    -   [Board Slice](#board-slice)
    -   [List Slice](#list-slice)

## Tech Stack

This project is built using a modern web development stack, focusing on a responsive and dynamic user experience.

-   **Frontend Framework**: [React](https://react.dev/)
    -   A JavaScript library for building user interfaces.
-   **Build Tool**: [Vite](https://vitejs.dev/)
    -   A next-generation frontend tooling that provides an extremely fast development experience.
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with [Redux Persist](https://github.com/rt2zz/redux-persist)
    -   Redux Toolkit simplifies Redux development, and Redux Persist enables the application state to be stored in local storage and rehydrated upon page refresh.
-   **Authentication**: [Clerk](https://clerk.com/)
    -   A complete user management platform for React applications, handling user authentication, organization management, and more.
-   **Routing**: [React Router DOM](https://reactrouter.com/en/main)
    -   Standard library for routing in React applications.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
    -   A utility-first CSS framework for rapidly building custom designs.
    -   Used with `class-variance-authority`, `clsx`, and `tailwind-merge` for managing conditional and merged Tailwind classes.
-   **UI Components**: [Radix UI](https://www.radix-ui.com/)
    -   A collection of unstyled, accessible UI components for building high-quality design systems.
-   **Drag and Drop Functionality**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
    -   A library for implementing beautiful and accessible drag and drop interfaces.
-   **Date Picker**: [React Day Picker](https://react-day-picker.js.org/)
    -   A flexible and accessible date picker component.
-   **Notifications**: [Sonner](https://sonner.emilkowalski.com/)
    -   An opinionated toast component for React.
-   **Icons**: [Lucide React](https://lucide.dev/)
    -   A collection of customizable SVG icons.
-   **Utility Libraries**:
    -   `date-fns`: A modern JavaScript date utility library.
    -   `unsplash-js`: Likely used for interacting with the Unsplash API to fetch images.

## Architecture and Tradeoffs

The application follows a component-based architecture typical of React applications, with a clear separation of concerns.

-   **Client-Side Redux Persistence**: The use of `redux-persist` ensures that the application's state (specifically, board and list data) is saved to the browser's local storage.
    -   **Tradeoff**: This enhances user experience by retaining data across browser sessions and refreshes, reducing the need to refetch data. However, it means sensitive user data should not be stored directly in Redux, and adds a layer of complexity for state hydration and rehydration.
-   **Clerk for Authentication**: Clerk simplifies the implementation of complex authentication flows, including user sign-up, sign-in, and organization management.
    -   **Tradeoff**: While it significantly reduces development time and ensures robust security features out-of-the-box, it introduces a dependency on a third-party service for core user management.
-   **Vite for Development**: Vite's architecture provides extremely fast cold start times and hot module replacement (HMR).
    -   **Tradeoff**: While offering a superior development experience, it might require specific configuration compared to more established build tools like Webpack, especially for advanced use cases.
-   **Tailwind CSS and Radix UI**: Combining Tailwind for styling with Radix UI for accessible components provides a powerful and flexible styling solution.
    -   **Tradeoff**: Radix UI components are unstyled, requiring manual styling with Tailwind classes. This offers maximum control over the visual appearance but can result in verbose HTML if not carefully managed through custom components.

## Redux State Management

The application uses Redux Toolkit to manage its global state, with a focus on boards and lists. The state is structured into slices, making it modular and maintainable.

### Board Slice

The `boardSlice` manages the collection of boards in the application.

-   **State Shape**:
    ```javascript
    {
        boards: [], // An array of board objects
    }
    ```
    Each board object typically has:
    -   `id`: Unique identifier for the board.
    -   `title`: The title of the board.

-   **Reducers (Actions)**:
    -   `addBoard(state, action)`: Adds a new board to the `boards` array. `action.payload` should be the new board object.
    -   `deleteBoard(state, action)`: Removes a board from the `boards` array based on `boardId` in `action.payload`.
    -   `updateBoard(state, action)`: Updates the `title` of a specific board based on `boardId` in `action.payload`.

### List Slice

The `listSlice` manages lists and their associated cards, organized by `boardId`.

-   **State Shape**:
    ```javascript
    {
        byBoardId: {
            // [boardId]: [ {id, title, order, boardId, cards: []}, ... ]
        }
    }
    ```
    -   `byBoardId`: An object where keys are `boardId`s and values are arrays of list objects belonging to that board.
    Each list object typically has:
    -   `id`: Unique identifier for the list.
    -   `title`: The title of the list.
    -   `order`: The display order of the list within its board.
    -   `boardId`: The ID of the board to which the list belongs.
    -   `cards`: An array of card objects.
        Each card object typically has:
        -   `id`: Unique identifier for the card.
        -   `title`: The title of the card.
        -   `description`: The description of the card.
        -   `order`: The display order of the card within its list.
        -   `listId`: The ID of the list to which the card belongs.

-   **Reducers (Actions)**:
    -   `initializeBoardLists(state, action)`: Initializes default lists for a given `boardId` if they don't exist.
    -   `addList(state, action)`: Adds a new list to a specific board. `action.payload` should contain the list object including `boardId`.
    -   `removeList(state, action)`: Removes a list from a board based on `boardId` and `listId` in `action.payload`.
    -   `updateListTitle(state, action)`: Updates the `title` of a specific list.
    -   `updateListOrder(state, action)`: Updates the order of lists within a board.
    -   `addCard(state, action)`: Adds a new card to a specific list.
    -   `updateCardDescription(state, action)`: Updates the `description` of a specific card.
    -   `updateCardTitle(state, action)`: Updates the `title` of a specific card.
    -   `addCardAtIndex(state, action)`: Adds a card at a specific index within a list.
    -   `removeCard(state, action)`: Removes a card from a list.
    -   `updateCardOrder(state, action)`: Updates the order of cards within a list.
    -   `moveCardToList(state, action)`: Moves a card from one list to another within the same board.
