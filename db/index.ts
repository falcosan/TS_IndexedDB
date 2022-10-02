export default function () {
    const keys = {
        posts: [{ name: 'uuid', unique: true }],
        projects: [{ name: 'uuid', unique: true }],
    };
    let db!: IDBDatabase;
    const request = indexedDB.open('data', 1);
    request.onerror = (err) => console.error(`IndexedDB error: ${request.error}`, err);
    request.onsuccess = () => (db = request.result);
    request.onupgradeneeded = () => {
        const db = request.result;
        const postsStore = db.createObjectStore('postsStore', { keyPath: keys.posts[0].name });
        const projectsStore = db.createObjectStore('projectsStore', { keyPath: keys.projects[0].name });
        keys.posts.forEach((key) => postsStore.createIndex(key.name, key.name, { unique: key.unique }));
        keys.projects.forEach((key) => projectsStore.createIndex(key.name, key.name, { unique: key.unique }));
    };
    return db;
}
