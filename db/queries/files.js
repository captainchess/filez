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
}

export async function getFiles() {
  const sql = `
  SELECT *, (
    SELECT to_json(folders.name)
    FROM folders
    WHERE folders.id = files.folder_id) AS folder_name
  FROM files
  `;

  const { rows: files } = await db.query(sql);
  return files;
}

export async function createFileByFolderId(id, name, size, folderId) {
  const sql = `
  INSERT INTO files (name, size, folder_id)
  VALUES ($2, $3, $4)
  WHERE folder_id = $1
  RETURNING *
  `;

  const { rows: [file] } = await db.query(sql, [id, name, size, folderId]);
  return file;
}
