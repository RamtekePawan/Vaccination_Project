CREATE TABLE users (
    id serial PRIMARY KEY, first_name varchar(255) NOT NULL, middle_name varchar(255) NOT NULL, last_name varchar(255) NOT NULL, address text, email varchar(255), password varchar(255), blood_group varchar(10), age int NOT NULL, state varchar(255) NOT NULL, city varchar(255) NOT NULL, zip int NOT NULL, vaccination_certificate_id varchar(255), vaccination_certificate_date date, first_vaccination_city varchar(255), second_vaccination_city varchar(255), created_at timestamp, updated_at timestamp, created_by varchar(255), updated_by varchar(255), enabled int
);

INSERT INTO
    users (
        first_name, middle_name, last_name, address, email, password, blood_group, age, state, city, zip, vaccination_certificate_id, vaccination_certificate_date, first_vaccination_city, second_vaccination_city, created_at, updated_at, created_by, updated_by, enabled
    )
VALUES (
        'John', 'Doe', 'Smith', '123 Main St', 'john.doe@example.com', 'password123', 'A+', 30, 'California', 'Los Angeles', 90001, 'VCID001', '2023-01-15', 'Los Angeles', 'San Francisco', '2023-03-24 10:00:00', '2023-03-24 10:00:00', 'admin', 'admin', 1
    ),
    (
        'Jane', 'Marie', 'Johnson', '456 Elm St', 'jane.johnson@example.com', 'securepass', 'B-', 25, 'New York', 'New York City', 10001, 'VCID002', '2022-12-31', 'New York City', 'Albany', '2023-03-24 11:00:00', '2023-03-24 11:00:00', 'admin', 'admin', 1
    ),
    (
        'Michael', 'James', 'Williams', '789 Oak St', 'michael.williams@example.com', 'pass123', 'O+', 35, 'Texas', 'Houston', 77002, 'VCID003', '2023-02-28', 'Houston', 'Dallas', '2023-03-24 12:00:00', '2023-03-24 12:00:00', 'admin', 'admin', 1
    ),
    (
        'Sarah', 'Elizabeth', 'Brown', '101 Pine St', 'sarah.brown@example.com', 'password456', 'AB-', 28, 'Florida', 'Miami', 33101, 'VCID004', '2023-03-15', 'Miami', 'Orlando', '2023-03-24 13:00:00', '2023-03-24 13:00:00', 'admin', 'admin', 1
    ),
    (
        'Robert', 'Alan', 'Wilson', '202 Maple St', 'robert.wilson@example.com', 'pass456', 'A-', 40, 'Illinois', 'Chicago', 60601, 'VCID005', '2023-02-14', 'Chicago', 'Springfield', '2023-03-24 14:00:00', '2023-03-24 14:00:00', 'admin', 'admin', 1
    ),
    (
        'Emily', 'Grace', 'Anderson', '303 Cedar St', 'emily.anderson@example.com', 'securepassword', 'B+', 32, 'Washington', 'Seattle', 98101, 'VCID006', '2023-03-10', 'Seattle', 'Olympia', '2023-03-24 15:00:00', '2023-03-24 15:00:00', 'admin', 'admin', 1
    ),
    (
        'David', 'Matthew', 'Thompson', '404 Birch St', 'david.thompson@example.com', 'adminpass', 'O-', 45, 'Michigan', 'Detroit', 48201, 'VCID007', '2023-01-01', 'Detroit', 'Lansing', '2023-03-24 16:00:00', '2023-03-24 16:00:00', 'admin', 'admin', 1
    ),
    (
        'Jennifer', 'Anne', 'White', '505 Elm St', 'jennifer.white@example.com', 'admin123', 'AB+', 27, 'Ohio', 'Columbus', 43201, 'VCID008', '2023-02-01', 'Columbus', 'Cleveland', '2023-03-24 17:00:00', '2023-03-24 17:00:00', 'admin', 'admin', 1
    ),
    (
        'Daniel', 'Joseph', 'Green', '606 Oak St', 'daniel.green@example.com', 'admin456', 'B-', 38, 'Pennsylvania', 'Philadelphia', 19101, 'VCID009', '2023-03-20', 'Philadelphia', 'Harrisburg', '2023-03-24 18:00:00', '2023-03-24 18:00:00', 'admin', 'admin', 1
    ),
    (
        'Jessica', 'Nicole', 'Jones', '707 Pine St', 'jessica.jones@example.com', 'admin789', 'A+', 33, 'Georgia', 'Atlanta', 30301, 'VCID010', '2023-01-20', 'Atlanta', 'Savannah', '2023-03-24 19:00:00', '2023-03-24 19:00:00', 'admin', 'admin', 1
    );