import * as Constant from '../model/constant.js'
import { Message } from '../model/message.js'
import { Thread } from '../model/thread.js'

export async function signIn(email,password) {
    await firebase.auth().signInWithEmailAndPassword(email,password)
}

export async function signOut() {
    await firebase.auth().signOut()
}

export async function addThread(thread) {
    const ref = await firebase.firestore()
                              .collection(Constant.collectionName.THREADS)
                              .add(thread.serialize())
    return ref.id 
}

export async function deleteThread(threadId) {
     await firebase.firestore().collection(Constant.collectionName.THREADS).doc(threadId).delete()
}


//To be developed for deleting messages
export async function deleteThreadMessage(threadId) {
    const snapShot = await firebase.firestore().collection(Constant.collectionName.MESSAGES)
    .where('threadId', '==',threadId)
    .orderBy('timestamp')
    .get()

            let messages = []
            snapShot.forEach(doc => {
            const m = new Message(doc.data())
            m.docId = doc.id
            firebase.firestore().collection(Constant.collectionName.MESSAGES).doc(m.docId).delete()
            })    
}

export async function getThreadList() {
    let threadList = []
   const snapShot = await firebase.firestore()
                                  .collection(Constant.collectionName.THREADS)
                                  .orderBy('timestamp','desc')
                                  .get()
    snapShot.forEach(doc => {
        const t = new Thread(doc.data())
        t.docId = doc.id
        threadList.push(t)
    })
    return threadList
}

export async function getOneThread(threadId) {
    const ref = await firebase.firestore().collection(Constant.collectionName.THREADS)
                .doc(threadId).get()
    if (!ref.exists) {
        return null
    }
    const t = new Thread(ref.data())
    t.docId = threadId
    return t
}

export async function addMessage(message) {
    const ref = await firebase.firestore().collection(Constant.collectionName.MESSAGES)
                    .add(message.serialize())
    return ref.id
}

export async function getMessageList(threadId) {
    const snapShot = await firebase.firestore().collection(Constant.collectionName.MESSAGES)
                    .where('threadId', '==',threadId)
                    .orderBy('timestamp')
                    .get()

    let messages = []
    snapShot.forEach(doc => {
        const m = new Message(doc.data())
        m.docId = doc.id
        messages.push(m)
    })
    return messages
}

export async function searchThreads(keywordsArray) {
    const threadList = []
    const snapShot = await firebase.firestore().collection(Constant.collectionName.THREADS)
                    .where('keywordsArray','array-contains-any',keywordsArray)
                    .orderBy('timestamp','desc')
                    .get()
    snapShot.forEach(doc =>{
        const t = new Thread(doc.data())
        t.docId = doc.id
        threadList.push(t)
    })
    return threadList
}

export async function signUp(email,password) {
    await firebase.auth().createUserWithEmailAndPassword(email,password)
}