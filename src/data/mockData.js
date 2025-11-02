export const MOCK_USERS = [
  {
    user_id: "672def8a7ab28f521e42a123",
    email: "owner@example.com",
    name: "Jan Novak (Owner)",
    password: "password",
  },
  {
    user_id: "b89cde0c8cd49h743h64d356",
    email: "member@example.com",
    name: "Jana Nova (Member)",
    password: "password",
  },
];

export const INITIAL_SHOPPING_LISTS = [
  {
    _id: "a44bbf9b8bc39g632f53c245",
    name: "Weekend shopping",
    owner_id: "672def8a7ab28f521e42a123",
    is_archived: false,
    created_at: "2025-10-26T15:00:00Z",
    updated_at: "2025-10-26T15:05:00Z",
    members: [
      {
        user_id: "672def8a7ab28f521e42a123",
        name: "Jan Novak",
        email: "jan.novak@example.com",
        role: "owner",
        joined_at: "2025-10-26T15:00:00Z",
      },
      {
        user_id: "b89cde0c8cd49h743g64d356",
        name: "Jana Nova",
        email: "jana.nova@example.com",
        role: "member",
        joined_at: "2025-10-26T15:01:00Z",
      },
    ],
    items: [
      {
        _id: "c12dcf1d9ef50i854h75e467",
        name: "Apple",
        completed: false,
        completed_at: null,
        added_by: "672def8a7ab28f521e42a123",
        created_at: "2025-10-26T15:02:00Z",
      },
      {
        _id: "d23edg2e0fg61j965i86f578",
        name: "Milk",
        completed: true,
        completed_at: "2025-10-26T15:03:00Z",
        added_by: "672def8a7ab28f521e42a123",
        created_at: "2025-10-26T15:02:30Z",
      },
      {
        _id: "e34feh3f1gh72k076j97g689",
        name: "Sugar",
        completed: false,
        completed_at: null,
        added_by: "672def8a7ab28f521e42a123",
        created_at: "2025-10-26T15:03:00Z",
      },
      {
        _id: "f45gfi4g2hi83l187k08h79a",
        name: "Tea",
        completed: false,
        completed_at: null,
        added_by: "b89cde0c8cd49h743g64d356",
        created_at: "2025-10-26T15:03:30Z",
      },
      {
        _id: "g56hgj5h3ij94m298l19i8ab",
        name: "Egg",
        completed: false,
        completed_at: null,
        added_by: "672def8a7ab28f521e42a123",
        created_at: "2025-10-26T15:04:00Z",
      },
    ],
  },
  {
    _id: "b55ccf0a9cd40h743h64e356",
    name: "Office supplies",
    owner_id: "672def8a7ab28f521e42a123",
    is_archived: false,
    created_at: "2025-10-27T10:00:00Z",
    updated_at: "2025-10-27T11:30:00Z",
    members: [
      {
        user_id: "672def8a7ab28f521e42a123",
        name: "Jan Novak",
        email: "jan.novak@example.com",
        role: "owner",
        joined_at: "2025-10-27T10:00:00Z",
      },
    ],
    items: [
      {
        _id: "h67ihk6i4jk05n309m20j9bc",
        name: "Notebooks",
        completed: false,
        completed_at: null,
        added_by: "672def8a7ab28f521e42a123",
        created_at: "2025-10-27T10:15:00Z",
      },
      {
        _id: "i78jil7j5kl16o410n31k0cd",
        name: "Pens",
        completed: true,
        completed_at: "2025-10-27T11:00:00Z",
        added_by: "672def8a7ab28f521e42a123",
        created_at: "2025-10-27T10:20:00Z",
      },
      {
        _id: "j89kjm8k6lm27p521o42l1de",
        name: "Stapler",
        completed: false,
        completed_at: null,
        added_by: "672def8a7ab28f521e42a123",
        created_at: "2025-10-27T10:25:00Z",
      },
    ],
  },
];

export const CURRENT_USER_ID = "672def8a7ab28f521e42a123";
