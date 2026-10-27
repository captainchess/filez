async function createFolder({ name }) {
  const sql = `
    INSERT INTO folders
        (name)
    VALUES 
        ($1)
    RETURNING *
    `;

  const {
    rows: [folder],
  } = await db.query(sql, [name]);
}

