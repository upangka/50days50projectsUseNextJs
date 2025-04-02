export interface ProjectDemo {
  id: number
  title: string
  route: string
  finished: boolean
}

export const projects: ProjectDemo[] = [
  { id: 1, title: 'Expanding Cards', route: 'expanding-cards', finished: false },
  { id: 2, title: 'Progress Steps', route: 'progress-steps', finished: false },
  {
    id: 3,
    title: 'Rotating Navigation Animation',
    route: 'rotating-navigation-animation',
    finished: false
  },
  { id: 4, title: 'Hidden Search Widget', route: 'hidden-search-widget', finished: false },
  { id: 5, title: 'Blurry Loading', route: 'blurry-loading', finished: false },
  { id: 6, title: 'Scroll Animation', route: 'scroll-animation', finished: false },
  { id: 7, title: 'Split Landing Page', route: 'split-landing-page', finished: false },
  { id: 8, title: 'Form Wave', route: 'form-wave', finished: false },
  { id: 9, title: 'Sound Board', route: 'sound-board', finished: false },
  { id: 10, title: 'Dad Jokes', route: 'jokes', finished: true },
  { id: 11, title: 'Event Keycodes', route: 'event-keycodes', finished: false },
  { id: 12, title: 'Faq Collapse', route: 'faq-collapse', finished: false },
  { id: 13, title: 'Random Choice Picker', route: 'random-choice-picker', finished: false },
  { id: 14, title: 'Animated Navigation', route: 'animated-navigation', finished: false },
  { id: 15, title: 'Incrementing Counter', route: 'incrementing-counter', finished: false },
  { id: 16, title: 'Drink Water', route: 'drink-water', finished: false },
  { id: 17, title: 'Movie App', route: 'movie-app', finished: true },
  { id: 18, title: 'Background Slider', route: 'background-slider', finished: false },
  { id: 19, title: 'Theme Clock', route: 'theme-clock', finished: true },
  { id: 20, title: 'Button Ripple Effect', route: 'button-ripple-effect', finished: false },
  { id: 21, title: 'Drag N Drop', route: 'drag-n-drop', finished: false },
  { id: 22, title: 'Drawing App', route: 'drawing-app', finished: false },
  { id: 23, title: 'Kinetic Loader', route: 'kinetic-loader', finished: true },
  { id: 24, title: 'Content Placeholder', route: 'content-placeholder', finished: false },
  { id: 25, title: 'Sticky Navbar', route: 'sticky-navbar', finished: true },
  { id: 26, title: 'Double Vertical Slider', route: 'double-vertical-slider', finished: false },
  { id: 27, title: 'Toast Notification', route: 'toast-notification', finished: false },
  { id: 28, title: 'Github Profiles', route: 'github-profiles', finished: true },
  { id: 29, title: 'Double Click Heart', route: 'double-click-heart', finished: true },
  { id: 30, title: 'Auto Text Effect', route: 'auto-text-effect', finished: true },
  { id: 31, title: 'Password Generator', route: 'password-generator', finished: false },
  { id: 32, title: 'Good Cheap Fast', route: 'good-cheap-fast', finished: false },
  { id: 33, title: 'Notes App', route: 'notes-app', finished: false },
  { id: 34, title: 'Animated Countdown', route: 'animated-countdown', finished: false },
  { id: 35, title: 'Image Carousel', route: 'image-carousel', finished: false },
  { id: 36, title: 'Hoverboard', route: 'hoverboard', finished: false },
  { id: 37, title: 'Pokedex', route: 'pokedex', finished: false },
  { id: 38, title: 'Mobile Tab Navigation', route: 'mobile-tab-navigation', finished: false },
  {
    id: 39,
    title: 'Password Strength Background',
    route: 'password-strength-background',
    finished: false
  },
  { id: 40, title: '3d Background Boxes', route: '3d-background-boxes', finished: false },
  { id: 41, title: 'Verify Account Ui', route: 'verify-account-ui', finished: false },
  { id: 42, title: 'Live User Filter', route: 'live-user-filter', finished: true },
  { id: 43, title: 'Feedback Ui Design', route: 'feedback-ui-design', finished: false },
  { id: 44, title: 'Custom Range Slider', route: 'custom-range-slider', finished: false },
  {
    id: 45,
    title: 'Netflix Mobile Navigation',
    route: 'netflix-mobile-navigation',
    finished: false
  },
  { id: 46, title: 'Quiz App', route: 'quiz-app', finished: false },
  { id: 47, title: 'Testimonial Box Switcher', route: 'testimonial-box-switcher', finished: true },
  { id: 48, title: 'Random Image Feed', route: 'random-image-feed', finished: false },
  { id: 49, title: 'Todo List', route: 'todo-list', finished: false },
  { id: 50, title: 'Insect Catch Game', route: 'insect-catch-game', finished: false },
  { id: 51, title: 'Simple Timer', route: 'simple-timer', finished: false }
]

/**
 * 已完成的项目
 */
export const finishedProjects = projects.filter(project => project.finished)
/**
 * 未完成的项目
 */
export const unfinishedProjects = projects.filter(project => !project.finished)
