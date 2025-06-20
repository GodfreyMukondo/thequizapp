##TheQuizApp -Full Stack Quiz Platform using Spring Boot and Reacjs

I designed this full stack web application for educational or self learners and this project is still under development and I will add new features improvements regularly. 
-This projects will allow students to register, login, take timed quizzes and download their results.
-The system will strictly controls access , ensuring that only authorised Admins can manage questions and view performancs data.
-All results can be exported in PDF, EXCELL and CSV formats for record keeping and analysis.

##User Workflow
##  Key Features

### User Workflow
-  *Student Registration* – Students can create an account to access the platform.
- *Secure Login* – After registering, users are directed to the login page to sign in.
-  *Home Page Access* – After login, users land on a personal dashboard/home page.

###  Quiz Functionality
- *Take Quizzes* – Students take quizzes pulled dynamically from the backend.
- *Auto Evaluation* – The system calculates and displays results after submission.
- *Timed Quizzes* – Quizzes can include countdown timers.
- *Performance Graphs* – Charts and graphs visualize student progress over time.

###  Result Export
-  *CSV Export*
- *PDF Export*
- *Excel Export (XLSX)*

### Role-Based Access Control
-  *Admin-Only Functions*:
  - Add, update, or delete quiz questions
  - Export all quiz results
  - View global performance statistics
-  *Unauthorized Access Prevention*:
  - Non-admins cannot access or edit quiz content
  - Attempts are blocked with a custom message:  
 “Access Denied – Only Admins Are Allowed to Perform This Action”



## Additional Features

- *Email Notifications* – Students receive email confirmations for their quiz results.
- *User Profile with Image Upload* – Students can upload a profile picture after registration.
-  *Performance Charts* – Graphs show progress over time, powered by charting libraries.
- *Countdown Timer* – Each quiz can have a countdown timer to simulate real exam conditions.


## Technology Stack

### Backend – Spring Boot
- Java 17+
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- *PostgreSQL* – Primary database
- Apache POI – Export to Excel
- iText – Generate PDFs
- JavaMailSender – Send emails

### Frontend – ReactJS
- ReactJS (Functional Components + Hooks)
- React Router – Navigation
- Axios – HTTP client for API calls
- Chart.js or Recharts – For graph rendering



##  PostgreSQL Configuration 

spring.application.name=thequizapp

spring.datasource.url=jdbc:postgresql://localhost:5432/quizapp
spring.datasource.username=postgres
spring.datasource.password=P@ssw0rd

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=0KtrCT6O7G5GMuAZSInZZD68VWw6YzJNp15mOx7xh6ly3G7PPakFXvXpLDG1/+hSA/3OVgSQ3gTENuWfnxb/Yg==
jwt.expiration=3600000


