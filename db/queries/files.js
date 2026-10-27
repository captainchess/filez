import db from "#db/client";

export async function createFile(name, size, folderId) {
  const sql = `
    INSERT INTO files
        (name, size, folder_id)
    VALUES
        ($1, $2, $3)
    RETURNING *
    `;

  const {
    rows: [file],
  } = await db.query(sql, [name, size, folderId]);
  return file;
};

export async function getFiles() {
  const sql = `
  SELECT * 
  FROM files
  `;

  const {rows: files} = db.query(sql);
  return files;
}
/*
export async function getFile(id) {
  const sql = `
   SELECT *, (
    SELECT json_agg(folders)
    FROM folders
    WHERE folders.id = files.folder_id
  ) AS folder
   FROM files
   WHERE id = $1`;

   const { rows: file } = await db.query(sql, [id]);
   return file;
}
   */


