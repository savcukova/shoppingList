function ListHeader({ name, onEdit, onDelete, onArchive, userRole }) {
  return (
    <header>
      <h1>{name}</h1>
      <div>
        {userRole === "owner" && (
          <>
            <button onClick={onEdit}>Upravit název</button>
            <button onClick={onArchive}>Archivovat</button>
            <button onClick={onDelete}>Smazat</button>
          </>
        )}
      </div>
    </header>
  );
}

export default ListHeader;
