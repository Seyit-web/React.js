


let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[] 
} 


let websocet: WebSocket | null = null
type EventsNamesType = 'messages-received' | 'status-changed'



const closeHandler =  () => {
    notifyAboutStatus('pending')               
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

const openHandler = () => {
    notifyAboutStatus('ready')
}

const errorHandler = () => {
    notifyAboutStatus('error')
    console.error('REFRESH PAGE')    
}



const cleanUp = () => {
    websocet?.removeEventListener('close', closeHandler)
    websocet?.removeEventListener('message', messageHandler)
    websocet?.removeEventListener('open', openHandler)
    websocet?.removeEventListener('error', errorHandler)
}

const notifyAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    websocet?.close()

    websocet = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifyAboutStatus('pending')
    websocet.addEventListener('close', closeHandler)
    websocet.addEventListener('message', messageHandler)
    websocet.addEventListener('open', openHandler)
    websocet.addEventListener('error', errorHandler)
}



export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        websocet?.close()  
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        websocet?.send(message)
    }
}



type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type StatusType = 'pending' | 'ready' | 'error'


export type ChatMessageType =   {
    message: string
    photo: string
    userId: number
    userName: string
}
