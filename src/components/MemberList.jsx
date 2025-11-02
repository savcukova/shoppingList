function MemberList({ members, onRemoveMember }) {
  if (members.length === 0) {
    return <p>No members</p>;
  }

  if (members.length === 1 && members[0].role === "owner") {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No other users</p>
      </div>
    );
  }

  return (
    <ul>
      {members.map((member) => (
        <Member
          key={member.user_id}
          member={member}
          onRemove={() => onRemoveMember(member.user_id)}
        />
      ))}
    </ul>
  );
}

export default MemberList;
