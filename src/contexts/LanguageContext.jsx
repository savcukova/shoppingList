import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Translation dictionary
const translations = {
  cs: {
    // Navigation & General
    login: "Přihlásit se",
    logout: "Odhlásit se",
    register: "Registrovat se",
    email: "Email",
    password: "Heslo",
    name: "Jméno",
    back: "Zpět",
    save: "Uložit",
    cancel: "Zrušit",
    delete: "Smazat",
    edit: "Upravit",
    add: "Přidat",
    confirm: "Potvrdit",
    close: "Zavřít",
    
    // Shopping Lists
    shoppingList: "Nákupní seznam",
    shoppingLists: "Nákupní seznamy",
    lists: "Seznamy",
    myLists: "Moje seznamy",
    archived: "Archivované",
    noLists: "Žádné seznamy",
    createList: "Vytvořit seznam",
    listName: "Název seznamu",
    deleteList: "Smazat seznam?",
    archiveList: "Archivovat seznam?",
    unarchiveList: "Zrušit archivaci?",
    leaveList: "Opustit seznam?",
    leaveListConfirm: "Opustit tento seznam?",
    
    // Items
    items: "Položky",
    item: "Položka",
    noItems: "Žádné položky",
    addItem: "Přidat položku",
    itemName: "Název položky",
    allItems: "Všechny",
    incomplete: "Nedokončené",
    completed: "Dokončené",
    completedItems: "Dokončené položky",
    incompleteItems: "Nedokončené položky",
    totalItems: "Celkem položek",
    
    // Members
    members: "Členové",
    addMember: "Přidat člena",
    removeMember: "Odebrat člena",
    memberEmail: "Email člena",
    owner: "Vlastník",
    member: "Člen",
    accessDenied: "Přístup zamítnut. Nejste členem tohoto seznamu.",
    listNotFound: "Seznam nenalezen",
    
    // Statistics
    statistics: "Statistiky",
    itemsOverview: "Přehled položek",
    listsOverview: "Přehled seznamů",
    
    // Theme & Language
    theme: "Téma",
    lightMode: "Světlý režim",
    darkMode: "Tmavý režim",
    language: "Jazyk",
    czech: "Čeština",
    english: "Angličtina",
    
    // Additional
    archive: "Archivovat",
    listUsers: "Uživatelé seznamu",
    alreadyHaveAccount: "Již máte účet? Přihlásit se",
    dontHaveAccount: "Nemáte účet? Registrovat se",
    pleaseEnterEmail: "Zadejte email",
    pleaseEnterEmailPassword: "Zadejte email a heslo",
    pleaseEnterEmailPasswordName: "Zadejte email, heslo a jméno",
    editList: "Upravit seznam",
    manageOtherUsers: "Spravovat ostatní uživatele",
    addNew: "Přidat nové",
    noMembers: "Žádní členové",
    noOtherUsers: "Žádní ostatní uživatelé",
  },
  en: {
    // Navigation & General
    login: "Login",
    logout: "Logout",
    register: "Register",
    email: "Email",
    password: "Password",
    name: "Name",
    back: "Back",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    confirm: "Confirm",
    close: "Close",
    
    // Shopping Lists
    shoppingList: "Shopping list",
    shoppingLists: "Shopping lists",
    lists: "Lists",
    myLists: "My lists",
    archived: "Archived",
    noLists: "No lists",
    createList: "Create list",
    listName: "List name",
    deleteList: "Delete this list?",
    archiveList: "Archive this list?",
    unarchiveList: "Unarchive this list?",
    leaveList: "Leave list",
    leaveListConfirm: "Leave this list?",
    
    // Items
    items: "Items",
    item: "Item",
    noItems: "No items",
    addItem: "Add item",
    itemName: "Item name",
    allItems: "All",
    incomplete: "Incomplete",
    completed: "Completed",
    completedItems: "Completed items",
    incompleteItems: "Incomplete items",
    totalItems: "Total items",
    
    // Members
    members: "Members",
    addMember: "Add member",
    removeMember: "Remove member",
    memberEmail: "Member email",
    owner: "Owner",
    member: "Member",
    accessDenied: "Access Denied. You are not a member of this list.",
    listNotFound: "List not found",
    
    // Statistics
    statistics: "Statistics",
    itemsOverview: "Items overview",
    listsOverview: "Lists overview",
    
    // Theme & Language
    theme: "Theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    language: "Language",
    czech: "Czech",
    english: "English",
    
    // Additional
    archive: "Archive",
    listUsers: "List users",
    alreadyHaveAccount: "Already have an account? Login",
    dontHaveAccount: "Don't have an account? Register",
    pleaseEnterEmail: "Please enter email",
    pleaseEnterEmailPassword: "Please enter both email and password",
    pleaseEnterEmailPasswordName: "Please enter email, password, and name",
    editList: "Edit list",
    manageOtherUsers: "Manage other users",
    addNew: "Add new",
    noMembers: "No members",
    noOtherUsers: "No other users",
  },
};

export const LanguageProvider = ({ children }) => {
  // Load language from localStorage or default to 'cs'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "cs";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

