# Memory Game with 

This project is an interactive memory game built using **Angular 19**. The application challenges players to memorize and reproduce a sequence of colors. With each successful round, the difficulty increases as a new color is added to the sequence. This project demonstrates the use of Angular fundamentals, including components, services, animations, and application state management.

## Features

1. **Start the Game**:
  - Click the "Start" button to begin.
  - A sequence of two colors is displayed on the screen for **15 seconds**. Each color in the sequence briefly illuminates to help the player memorize the order.

2. **Reproduce the Sequence**:
  - After the 15-second display, the color buttons reappear alongside a timer indicating the remaining time to reproduce the sequence.
  - Players must click the buttons in the exact order of the displayed sequence.

3. **Validate or Reset**:
  - After reproducing the sequence, click "Validate" to submit your response.
  - Click "Reset" to restart the current level and reselect the sequence.

4. **Scoring**:
  - Scores are based on **accuracy** and **speed**. Faster and more accurate responses earn higher scores.
  - If the sequence is correct, a new color is added to the sequence, and the player advances to the next level. If an error is made, the game ends and the final score is displayed.

5. **Level Progression**:
  - Each successful level adds a new color to the sequence, making it more challenging. For example, a sequence like `[red, blue]` in Level 1 becomes `[red, blue, green]` in Level 2.

6. **Game Over**:
  - If the player clicks the wrong color or the sequence is incorrect, the game ends. A message displays the **final score** with an option to restart.

## Objectives

This project aims to:
- Develop an interactive game using **Angular 19**.
- Apply Angular fundamentals, including components, services, state management, and animations.

## Project Structure

### Components
- **Game Component**: Manages game logic and displays the sequence.
- **Interface Component**: Displays color buttons and game controls.
- **Score/State Component**: Shows the score, level, and game status.

### Services
- **Game Service**: Handles game logic, including:
  - Sequence generation and validation.
  - Scoring and level progression.
  - Game state management.

### Animations
- Uses `@angular/animations` for visual effects:
  - Color buttons briefly illuminate during sequence display.
  - Interactive feedback animations for button clicks (e.g., zoom or flash).

## Key Methods in the Game Service
- `genererSequence()`: Generates a new random sequence.
- `ajouterCouleur()`: Adds a new color to the existing sequence.
- `verifierReponse()`: Checks the player's input against the sequence.
- `resetGame()`: Resets the game variables to start a new game.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/kholoud001/MemoryGame.git
