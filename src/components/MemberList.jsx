import Member from "./Member.jsx";

function MemberList({ members, onRemoveMember, isOwner, currentUserId }) {
  // Filtrujeme jen "other users" - vyloučíme ownery
  const otherUsers = members.filter((member) => member.role !== "owner");

  if (otherUsers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">No other users</p>
      </div>
    );
  }

  return (
    <ul>
      {otherUsers.map((member) => (
        <Member
          key={member.user_id}
          member={member}
          onRemove={() => onRemoveMember(member.user_id)}
          isOwner={isOwner}
          currentUserId={currentUserId}
        />
      ))}
    </ul>
  );
}

export default MemberList;
