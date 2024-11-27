import {
  mysqlTable,
  primaryKey,
  varchar,
  timestamp,
  datetime,
  mysqlEnum,
  tinyint,
  unique,
  text,
  int,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const articles = mysqlTable(
  "articles",
  {
    id: varchar({ length: 255 }).notNull(),
    title: varchar({ length: 255 }).notNull(),
    content: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    authorUid: varchar({ length: 255 }).references(() => doctors.uid, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      articlesId: primaryKey({ columns: [table.id], name: "articles_id" }),
    };
  }
);

export const consultationMessages = mysqlTable(
  "consultation_messages",
  {
    id: varchar({ length: 36 }).notNull(),
    content: varchar({ length: 255 }).notNull(),
    sentAt: datetime({ mode: "string" }).notNull(),
    consultationId: varchar({ length: 36 }).references(() => consultations.id, {
      onDelete: "cascade",
    }),
    senderUid: varchar({ length: 255 }).references(() => users.uid, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      consultationMessagesId: primaryKey({
        columns: [table.id],
        name: "consultation_messages_id",
      }),
    };
  }
);

export const consultations = mysqlTable(
  "consultations",
  {
    id: varchar({ length: 36 }).notNull(),
    status: mysqlEnum(["pending", "accepted", "declined", "completed"])
      .default("pending")
      .notNull(),
    requestedAt: datetime({ mode: "string" }).notNull(),
    acceptedAt: datetime({ mode: "string" }),
    completedAt: datetime({ mode: "string" }),
    doctorUid: varchar({ length: 255 }).references(() => doctors.uid, {
      onDelete: "cascade",
    }),
    patientUid: varchar({ length: 255 }).references(() => patients.uid, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      consultationsId: primaryKey({
        columns: [table.id],
        name: "consultations_id",
      }),
    };
  }
);

export const doctors = mysqlTable(
  "doctors",
  {
    uid: varchar({ length: 255 }).notNull(),
    specialization: varchar({ length: 255 }).notNull(),
    workplace: varchar({ length: 255 }).notNull(),
    documentUrl: varchar({ length: 255 }),
    isVerified: tinyint().default(0).notNull(),
  },
  (table) => {
    return {
      doctorsUid: primaryKey({ columns: [table.uid], name: "doctors_uid" }),
    };
  }
);

export const favorites = mysqlTable(
  "favorites",
  {
    id: varchar({ length: 255 }).notNull(),
    createdAt: datetime("created_at", { mode: "string", fsp: 6 })
      .default(sql`(CURRENT_TIMESTAMP(6))`)
      .notNull(),
    articleId: varchar({ length: 255 }).references(() => articles.id, {
      onDelete: "cascade",
    }),
    userUid: varchar({ length: 255 }).references(() => users.uid, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      favoritesId: primaryKey({ columns: [table.id], name: "favorites_id" }),
      idxF491100Ac21299363D1C347F8D: unique(
        "IDX_f491100ac21299363d1c347f8d"
      ).on(table.articleId, table.userUid),
    };
  }
);

export const forumReplies = mysqlTable(
  "forum_replies",
  {
    id: varchar({ length: 255 }).notNull(),
    responderRole: varchar("responder_role", { length: 255 }).notNull(),
    content: text().notNull(),
    createdAt: datetime("created_at", { mode: "string", fsp: 6 })
      .default(sql`(CURRENT_TIMESTAMP(6))`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 6 })
      .default(sql`(CURRENT_TIMESTAMP(6))`)
      .notNull(),
    responderUid: varchar({ length: 255 }).references(() => users.uid, {
      onDelete: "cascade",
    }),
    forumId: varchar({ length: 255 }).references(() => forums.id, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      forumRepliesId: primaryKey({
        columns: [table.id],
        name: "forum_replies_id",
      }),
    };
  }
);

export const forums = mysqlTable(
  "forums",
  {
    id: varchar({ length: 255 }).notNull(),
    title: varchar({ length: 255 }).notNull(),
    content: text().notNull(),
    status: varchar({ length: 255 }).default("open").notNull(),
    createdAt: datetime("created_at", { mode: "string", fsp: 6 })
      .default(sql`(CURRENT_TIMESTAMP(6))`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 6 })
      .default(sql`(CURRENT_TIMESTAMP(6))`)
      .notNull(),
    patientUid: varchar({ length: 255 }).references(() => patients.uid, {
      onDelete: "cascade",
    }),
    doctorUid: varchar({ length: 255 }).references(() => doctors.uid, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      forumsId: primaryKey({ columns: [table.id], name: "forums_id" }),
    };
  }
);

export const patients = mysqlTable(
  "patients",
  {
    uid: varchar({ length: 255 }).notNull(),
  },
  (table) => {
    return {
      patientsUid: primaryKey({ columns: [table.uid], name: "patients_uid" }),
    };
  }
);

export const skinLesions = mysqlTable(
  "skin_lesions",
  {
    id: varchar({ length: 255 }).notNull(),
    originalImageUrl: varchar({ length: 255 }).notNull(),
    processedImageUrl: varchar({ length: 255 }),
    status: mysqlEnum(["PENDING", "COMPLETED", "FAILED"])
      .default("PENDING")
      .notNull(),
    classification: varchar({ length: 255 }),
    createdAt: datetime({ mode: "string", fsp: 6 })
      .default(sql`(CURRENT_TIMESTAMP(6))`)
      .notNull(),
    processedAt: datetime({ mode: "string" }),
    patientUid: varchar({ length: 255 }).references(() => patients.uid, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      skinLesionsId: primaryKey({
        columns: [table.id],
        name: "skin_lesions_id",
      }),
    };
  }
);

export const users = mysqlTable(
  "users",
  {
    uid: varchar({ length: 255 }).notNull(),
    role: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    dob: datetime({ mode: "string" }).notNull(),
    address: varchar({ length: 255 }).notNull(),
    createdAt: datetime({ mode: "string" }).notNull(),
    updatedAt: datetime({ mode: "string" }).notNull(),
    points: int().notNull(),
    doctorUid: varchar({ length: 255 }).references(() => doctors.uid, {
      onDelete: "cascade",
    }),
    patientUid: varchar({ length: 255 }).references(() => patients.uid, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      usersUid: primaryKey({ columns: [table.uid], name: "users_uid" }),
      rel7Ec81Db8Eabecd3969B50D9098: unique(
        "REL_7ec81db8eabecd3969b50d9098"
      ).on(table.doctorUid),
      rel9D0F3432B1Dbedfdafd7666883: unique(
        "REL_9d0f3432b1dbedfdafd7666883"
      ).on(table.patientUid),
    };
  }
);
