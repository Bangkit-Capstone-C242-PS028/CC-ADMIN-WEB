import { relations } from "drizzle-orm/relations";
import { doctors, articles, consultations, consultationMessages, users, patients, favorites, forumReplies, forums, skinLesions } from "./schema";

export const articlesRelations = relations(articles, ({one, many}) => ({
	doctor: one(doctors, {
		fields: [articles.authorUid],
		references: [doctors.uid]
	}),
	favorites: many(favorites),
}));

export const doctorsRelations = relations(doctors, ({many}) => ({
	articles: many(articles),
	consultations: many(consultations),
	forums: many(forums),
	users: many(users),
}));

export const consultationMessagesRelations = relations(consultationMessages, ({one}) => ({
	consultation: one(consultations, {
		fields: [consultationMessages.consultationId],
		references: [consultations.id]
	}),
	user: one(users, {
		fields: [consultationMessages.senderUid],
		references: [users.uid]
	}),
}));

export const consultationsRelations = relations(consultations, ({one, many}) => ({
	consultationMessages: many(consultationMessages),
	doctor: one(doctors, {
		fields: [consultations.doctorUid],
		references: [doctors.uid]
	}),
	patient: one(patients, {
		fields: [consultations.patientUid],
		references: [patients.uid]
	}),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	consultationMessages: many(consultationMessages),
	favorites: many(favorites),
	forumReplies: many(forumReplies),
	doctor: one(doctors, {
		fields: [users.doctorUid],
		references: [doctors.uid]
	}),
	patient: one(patients, {
		fields: [users.patientUid],
		references: [patients.uid]
	}),
}));

export const patientsRelations = relations(patients, ({many}) => ({
	consultations: many(consultations),
	forums: many(forums),
	skinLesions: many(skinLesions),
	users: many(users),
}));

export const favoritesRelations = relations(favorites, ({one}) => ({
	article: one(articles, {
		fields: [favorites.articleId],
		references: [articles.id]
	}),
	user: one(users, {
		fields: [favorites.userUid],
		references: [users.uid]
	}),
}));

export const forumRepliesRelations = relations(forumReplies, ({one}) => ({
	user: one(users, {
		fields: [forumReplies.responderUid],
		references: [users.uid]
	}),
	forum: one(forums, {
		fields: [forumReplies.forumId],
		references: [forums.id]
	}),
}));

export const forumsRelations = relations(forums, ({one, many}) => ({
	forumReplies: many(forumReplies),
	patient: one(patients, {
		fields: [forums.patientUid],
		references: [patients.uid]
	}),
	doctor: one(doctors, {
		fields: [forums.doctorUid],
		references: [doctors.uid]
	}),
}));

export const skinLesionsRelations = relations(skinLesions, ({one}) => ({
	patient: one(patients, {
		fields: [skinLesions.patientUid],
		references: [patients.uid]
	}),
}));