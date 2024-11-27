-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `articles` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`authorUid` varchar(255),
	CONSTRAINT `articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consultation_messages` (
	`id` varchar(36) NOT NULL,
	`content` varchar(255) NOT NULL,
	`sentAt` datetime NOT NULL,
	`consultationId` varchar(36),
	`senderUid` varchar(255),
	CONSTRAINT `consultation_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consultations` (
	`id` varchar(36) NOT NULL,
	`status` enum('pending','accepted','declined','completed') NOT NULL DEFAULT 'pending',
	`requestedAt` datetime NOT NULL,
	`acceptedAt` datetime,
	`completedAt` datetime,
	`doctorUid` varchar(255),
	`patientUid` varchar(255),
	CONSTRAINT `consultations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `doctors` (
	`uid` varchar(255) NOT NULL,
	`specialization` varchar(255) NOT NULL,
	`workplace` varchar(255) NOT NULL,
	CONSTRAINT `doctors_uid` PRIMARY KEY(`uid`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` varchar(255) NOT NULL,
	`created_at` datetime(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP(6)),
	`articleId` varchar(255),
	`userUid` varchar(255),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`),
	CONSTRAINT `IDX_f491100ac21299363d1c347f8d` UNIQUE(`articleId`,`userUid`)
);
--> statement-breakpoint
CREATE TABLE `forum_replies` (
	`id` varchar(255) NOT NULL,
	`responder_role` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`created_at` datetime(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP(6)),
	`updated_at` datetime(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP(6)),
	`responderUid` varchar(255),
	`forumId` varchar(255),
	CONSTRAINT `forum_replies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forums` (
	`id` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`status` varchar(255) NOT NULL DEFAULT 'open',
	`created_at` datetime(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP(6)),
	`updated_at` datetime(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP(6)),
	`patientUid` varchar(255),
	`doctorUid` varchar(255),
	CONSTRAINT `forums_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`uid` varchar(255) NOT NULL,
	CONSTRAINT `patients_uid` PRIMARY KEY(`uid`)
);
--> statement-breakpoint
CREATE TABLE `skin_lesions` (
	`id` varchar(255) NOT NULL,
	`originalImageUrl` varchar(255) NOT NULL,
	`processedImageUrl` varchar(255),
	`status` enum('PENDING','COMPLETED','FAILED') NOT NULL DEFAULT 'PENDING',
	`classification` varchar(255),
	`createdAt` datetime(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP(6)),
	`processedAt` datetime,
	`patientUid` varchar(255),
	CONSTRAINT `skin_lesions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`uid` varchar(255) NOT NULL,
	`role` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`dob` datetime NOT NULL,
	`address` varchar(255) NOT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	`points` int NOT NULL,
	`doctorUid` varchar(255),
	`patientUid` varchar(255),
	CONSTRAINT `users_uid` PRIMARY KEY(`uid`),
	CONSTRAINT `REL_7ec81db8eabecd3969b50d9098` UNIQUE(`doctorUid`),
	CONSTRAINT `REL_9d0f3432b1dbedfdafd7666883` UNIQUE(`patientUid`)
);
--> statement-breakpoint
ALTER TABLE `articles` ADD CONSTRAINT `FK_977f5b85c7caa20393be77b4103` FOREIGN KEY (`authorUid`) REFERENCES `doctors`(`uid`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `consultation_messages` ADD CONSTRAINT `FK_9f864948beb2f9d18c0191662da` FOREIGN KEY (`consultationId`) REFERENCES `consultations`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `consultation_messages` ADD CONSTRAINT `FK_fa84418f6920f7d70b2b13f257e` FOREIGN KEY (`senderUid`) REFERENCES `users`(`uid`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `consultations` ADD CONSTRAINT `FK_1fd2f0ab5d896a334b21e228862` FOREIGN KEY (`doctorUid`) REFERENCES `doctors`(`uid`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `consultations` ADD CONSTRAINT `FK_fe6a098ff50def8c697fad21b00` FOREIGN KEY (`patientUid`) REFERENCES `patients`(`uid`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `favorites` ADD CONSTRAINT `FK_a9e25be94f65c6f11f420d97bca` FOREIGN KEY (`articleId`) REFERENCES `articles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `favorites` ADD CONSTRAINT `FK_eed380a15b39342036e3cc038e8` FOREIGN KEY (`userUid`) REFERENCES `users`(`uid`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_replies` ADD CONSTRAINT `FK_2016644a33983631468fe17679a` FOREIGN KEY (`responderUid`) REFERENCES `users`(`uid`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forum_replies` ADD CONSTRAINT `FK_77c6f888e9d1725d03e86ad9cc4` FOREIGN KEY (`forumId`) REFERENCES `forums`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forums` ADD CONSTRAINT `FK_2254adc3a48d7b473cf98e3bc61` FOREIGN KEY (`patientUid`) REFERENCES `patients`(`uid`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `forums` ADD CONSTRAINT `FK_b3a4b34ce38f8432ce44b834187` FOREIGN KEY (`doctorUid`) REFERENCES `doctors`(`uid`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `skin_lesions` ADD CONSTRAINT `FK_e011bf7f687a1795b17e5cbef2e` FOREIGN KEY (`patientUid`) REFERENCES `patients`(`uid`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `FK_7ec81db8eabecd3969b50d9098e` FOREIGN KEY (`doctorUid`) REFERENCES `doctors`(`uid`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `FK_9d0f3432b1dbedfdafd76668835` FOREIGN KEY (`patientUid`) REFERENCES `patients`(`uid`) ON DELETE cascade ON UPDATE no action;
*/