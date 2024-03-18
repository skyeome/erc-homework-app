interface RecordUploadData {
  uid: string;
  createdAt: Date;
  fileRef: string;
}

export const uploadRecord = async (data: RecordUploadData) => {
  console.log(data);
};
