function ListHeader({ name, isOwner, onBack, onEdit, onDelete, onArchive }) {
  return (
    <div>
      <button onClick={onBack}>Back</button>

      <h1>{name}</h1>

      {isOwner && (
        <div>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
          <button onClick={onArchive}>Archive</button>
        </div>
      )}
    </div>
  );
}

export default ListHeader;
