
class EventBus {

    private listeners: { [key: string]: ((event: any) => void)[] } = {};
  
    public on(eventType: string, listener: (event: any) => void) {
      if (!this.listeners[eventType]) {
        this.listeners[eventType] = [];
      }
      this.listeners[eventType].push(listener);
    }
  
    public emit(eventType: string, event: any) {
      const listeners = this.listeners[eventType];
      if (listeners) {
        listeners.forEach((listener) => listener(event));
      }
    }
  
    public off(eventType: string, listenerToRemove: (event: any) => void) {
      if (!this.listeners[eventType]) {
        return;
      }
      this.listeners[eventType] = this.listeners[eventType].filter(
        (listener) => listener !== listenerToRemove
      );
    }
  }

  export const eventBus = new EventBus();
  