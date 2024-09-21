# User Stories and Requirements Elicitation for Shared Living Web Application ("Roomie")

## Introduction

**Goal:**  
Improve shared living arrangements by addressing key challenges such as task coordination, communication, and social interaction.

**Target Users:**  
International students, travelers, and residents of share homes.

---

| **Feature**            | **User Story**                                                                                                                                       | **Functional Requirements**                                                                                                               | **Acceptance Criteria**                                                                                                        |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| **1. Profile Creation** | - As a new housemate, I want to create a profile to introduce myself and foster social connections.<br>- As a housemate, I want to view other housemates' profiles to connect more easily. | - Users can create, update, and view personal profiles with hobbies and interests.<br>- Profiles are accessible only to housemates.       | - Users can create and view profiles.<br>- Profiles are secure and visible only to housemates.                                 |
| **2. Calendar Syncing** | - As a housemate, I want to sync my schedule with housemates to plan around availability.<br>- As a traveler, I want to update my schedule.            | - Integrate with calendar APIs (e.g., Google Calendar).<br>- Notify users of schedule changes.                                            | - Users can sync calendars and receive notifications.<br>- Shared calendar is easily accessible to all housemates.             |
| **3. Chore Distribution** | - As a housemate, I want chores to be distributed fairly and tracked to ensure equal contribution.                                                  | - Use a chore allocation algorithm.<br>- Users can view and track assigned tasks.<br>- Notify users of assigned tasks and due dates.      | - Chores are fairly assigned.<br>- Users can track completed tasks.                                                            |
| **4. Anonymous Feedback** | - As a housemate, I want to submit anonymous feedback about housemates to avoid confrontation.<br>- As someone moving in, I want to view feedback on housemates for compatibility.  | - Users can submit anonymous feedback and view cumulative ratings.<br>- Ratings cover categories like cleanliness and task completion.    | - Users can submit and view anonymous feedback.<br>- Housemate ratings are visible but anonymous.                              |

---

## Non-Functional Requirements

| **Category**    | **Details**                                                                                           |
|-----------------|-------------------------------------------------------------------------------------------------------|
| **Performance** | Must handle concurrent users without significant delays, especially during peak times.                 |
| **Usability**   | The UI should be intuitive for non-technical users and non-native English speakers.                    |
| **Security**    | Data, including anonymous feedback, must be encrypted and securely stored.                             |
| **Scalability** | Should scale effectively as the user base grows without performance degradation.                       |
| **Localisation**| Must support multiple languages for international users.                                               |

---

## Conclusion

User stories and requirements address key pain points in shared living, such as scheduling, task allocation, and communication. By focusing on fair chore distribution, social integration, and anonymous feedback, the app provides a comprehensive solution to streamline household management and improve roommate interactions.
