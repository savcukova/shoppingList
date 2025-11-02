import Member from "./Member.jsx";

function MemberList({ members, onRemoveMember, isOwner, currentUserId }) {
  // Owner vidí všechny členy včetně sebe, Member vidí jen "other users" (ne ownery)
  const displayedMembers = isOwner
    ? members
    : members.filter((member) => member.role !== "owner");

  if (displayedMembers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">
          {isOwner ? "No members" : "No other users"}
        </p>
      </div>
    );
  }

  return (
    <ul>
      {displayedMembers.map((member) => (
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
