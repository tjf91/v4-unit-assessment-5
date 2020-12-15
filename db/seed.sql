drop table if exists helo_users;
create table helo_users
(id serial primary key,username varchar(100) not null, password varchar(100) not null, profile_pic text);

drop table if exists helo_posts;
create table helo_posts
(id serial primary key,title varchar(100) not null, content text, img text, author_id int references helo_users(id),date_created timestamp);

