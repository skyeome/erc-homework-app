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
    public title: string,
    public thumb: string,
    public images: { imageRef: string; imageUrl: string }[],
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
      data.title,
      data.thumb,
      data.images,
      data.date
    );
  },
};
