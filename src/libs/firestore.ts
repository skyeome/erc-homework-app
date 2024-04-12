import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

export class Reading {
  constructor(
    public id: string,
    public uid: string,
    public name: string,
    public level: string,
    public title: string,
    public thumb: string,
    public images: { imageRef: string; imageUrl: string }[],
    public record: { recordRef: string; recordUrl: string },
    public date: Timestamp
  ) {}
  toString() {
    return `
      ${this.id},
      ${this.uid},
      ${this.name},
      ${this.title},
      ${this.thumb},
      ${this.images},
      ${this.date},
    `;
  }
}

// Firestore data converter
export const readingConverter = {
  toFirestore: (reading: Reading) => {
    return {
      ...reading,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Reading(
      snapshot.id,
      data.uid,
      data.name,
      data.level,
      data.title,
      data.thumb,
      data.images,
      data.record,
      data.date
    );
  },
};

export class Record {
  constructor(
    public id: string,
    public uid: string,
    public name: string,
    public level: string,
    public recordRef: string,
    public recordUrl: string,
    public date: Timestamp
  ) {}
  toString() {
    return `
      ${this.id},
      ${this.uid},
      ${this.name},
      ${this.recordRef},
      ${this.recordUrl},
      ${this.date},
    `;
  }
}

// Firestore data converter
export const recordConverter = {
  toFirestore: (record: Record) => {
    return {
      ...record,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Record(
      snapshot.id,
      data.uid,
      data.name,
      data.level,
      data.recordRef,
      data.recordUrl,
      data.date
    );
  },
};

export class Workbook {
  constructor(
    public id: string,
    public uid: string,
    public name: string,
    public title: string,
    public level: string,
    public images: { imageRef: string; imageUrl: string }[],
    public record: { recordRef: string; recordUrl: string },
    public date: Timestamp
  ) {}
}

// Firestore data converter
export const workbookConverter = {
  toFirestore: (workbook: Workbook) => {
    return {
      ...workbook,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Workbook(
      snapshot.id,
      data.uid,
      data.name,
      data.title,
      data.level,
      data.images,
      data.record,
      data.date
    );
  },
};

export class Student {
  constructor(
    public id: string,
    public username: string,
    public name: string,
    public level: string,
    public points: string
  ) {}
}

// Firestore data converter
export const studentConverter = {
  toFirestore: (student: Student) => {
    return {
      ...student,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Student(
      snapshot.id,
      data.username,
      data.name,
      data.level,
      data.points
    );
  },
};

export class LevelOptions {
  constructor(public options: string[]) {}
}

// Firestore data converter
export const levelConverter = {
  toFirestore: (level: LevelOptions) => {
    return {
      ...level,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new LevelOptions(data.options);
  },
};
