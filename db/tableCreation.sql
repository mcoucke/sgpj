DROP TABLE IF EXISTS item_type;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS task;


CREATE TABLE item_type (
    item_type_id INT NOT NULL AUTO_INCREMENT,
    item_type_title VARCHAR(255) NOT NULL,
    item_type_description VARCHAR(512),
    PRIMARY KEY(item_type_id)
);

CREATE TABLE item (
    item_id INT NOT NULL AUTO_INCREMENT,
    item_title VARCHAR(255) NOT NULL,
    item_type_id INT,
    item_description VARCHAR(512),
    item_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    item_update_date TIMESTAMP,
    PRIMARY KEY(item_id),
    CONSTRAINT FKitem_type_id FOREIGN KEY (item_type_id) REFERENCES item_type(item_type_id)
);

CREATE TABLE task (
    task_id INT NOT NULL AUTO_INCREMENT,
    task_title VARCHAR(255) NOT NULL,
    task_description VARCHAR(512),
    task_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    task_task_duration INT NOT NULL,
    PRIMARY KEY(task_id)
);

