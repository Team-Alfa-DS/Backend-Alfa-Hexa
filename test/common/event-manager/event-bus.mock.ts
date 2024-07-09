import { IEventPublisher } from "src/common/application/events/event-publisher.abstract";
import { IEventSubscriber } from "src/common/application/events/event-subscriber.interface";
import { DomainEvent } from "src/common/domain/domain-event";

export class EventBusMock extends IEventPublisher {
    protected subscribers: Map<string, IEventSubscriber<DomainEvent>[]>;

    constructor() {
        super();
    }

    async publish(events: DomainEvent[]): Promise<void> {
        for (const event of events) {
            const subscribers = this.subscribers.get(event.constructor.name);
            if (subscribers) {
                await Promise.all(
                    subscribers.map(async subscriber => {
                        return subscriber.on(event);
                    })
                );
            }
        }
    }
}