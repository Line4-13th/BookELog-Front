## React + Vite

## Commit Message Type
This project follows the [Conventional Commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13) specification.

## Commit Message Format
Each commit message should follow this format:

<type>(<scope>): <subject>

- **type**: Describes the kind of change made
- **scope**: (Optional) Describes the section or module affected by the change
- **subject**: A brief description of the change (use the imperative mood)

### Commit Types
| Type     | Description                                                                                   |
|----------|-----------------------------------------------------------------------------------------------|
| `feat`   | A new feature                                                                                 |
| `fix`    | A bug fix                                                                                     |
| `docs`   | Documentation changes                                                                         |
| `style`  | Code style changes (formatting, whitespace, missing semicolons, etc.), no functional changes |
| `refactor` | Code changes that neither fix a bug nor add a feature                                      |
| `perf`   | Changes that improve performance                                                              |
| `test`   | Adding missing tests or correcting existing tests                                             |
| `build`  | Changes that affect the build system or external dependencies                                 |
| `ci`     | Changes to CI configuration files and scripts                                                 |
| `chore`  | Miscellaneous tasks, such as maintenance or changing documentation, no production code       |
| `revert` | Reverting a previous commit                                                                  |

### Examples
- **feat(auth): add login feature**
  - Adds a new login feature to the authentication module.
- **fix(api): resolve response delay issue**
  - Fixes a delay in the response time for API requests.
- **docs(readme): update commit message conventions**
  - Updates the README to include commit message guidelines.
- **style(header): format header component code**
  - Improves readability by adjusting code formatting in the header component.
- **test(api): add tests for user authentication**
  - Adds unit tests to cover user authentication API calls.

Adopting this convention will make it easier to automate release notes, understand changes, and maintain code quality.

## Example Project Structure
project-root/
├── backend/               # Django backend directory
│   ├── manage.py
│   ├── backend_app/       # Django app for handling backend logic
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   ├── models.py
│   │   └── ...
│   ├── api/               # Separate Django app for API endpoints (if needed)
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   └── requirements.txt   # Backend dependencies
│
└── frontend/              # React + Vite frontend
    ├── public/            # Static files (e.g., favicon, manifest.json)
    ├── src/
    │   ├── assets/        # Images, fonts, styles, etc.
    │   ├── components/    # Reusable components for UI
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── ...
    │   ├── pages/         # Pages based on the site map
    │   │   ├── Home/      # Home page
    │   │   │   └── HomePage.jsx
    │   │   ├── BookInfo/  # Book Info page with book details
    │   │   │   └── BookInfoPage.jsx
    │   │   ├── Search/    # Search page for listing results
    │   │   │   └── SearchPage.jsx
    │   │   ├── MyPage/    # User profile or dashboard
    │   │   │   └── MyPage.jsx
    │   │   └── ...
    │   ├── features/      # Feature-specific logic and UI (e.g., Sign-in, Search)
    │   │   ├── SignIn/    # Sign-in and authentication logic
    │   │   │   └── SignInForm.jsx
    │   │   └── BookList/  # Book listing components and logic
    │   │       └── BookList.jsx
    │   ├── hooks/         # Custom hooks for shared logic
    │   ├── services/      # API services (requests to Django backend)
    │   │   ├── apiClient.js  # General API client setup
    │   │   └── bookService.js # Book-related API calls
    │   ├── App.jsx
    │   ├── index.jsx
    │   └── ...
    ├── vite.config.js
    └── package.json       # Frontend dependencies