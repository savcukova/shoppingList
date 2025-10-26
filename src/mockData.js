export const INITIAL_SHOPPING_LIST = {
  listId: "list1",
  name: "Nákup na víkend",
  is_archived: false,
  owner_id: "user1",
  members: [
    { user_id: "user1", name: "Jan Novak", role: "owner" },
    { user_id: "user2", name: "Jana Nova", role: "member" },
  ],
  items: [
    { id: "item1", name: "Mléko", completed: false },
    { id: "item2", name: "Vejce (10 ks)", completed: true },
    { id: "item3", name: "Chleba", completed: false },
    { id: "item4", name: "Máslo", completed: false },
  ],
};

export const CURRENT_USER_ID = "user1";
