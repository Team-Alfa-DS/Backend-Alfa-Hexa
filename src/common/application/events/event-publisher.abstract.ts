import { DomainEvent } from "src/common/domain/domain-event";
import { IEventSubscriber } from "./event-subscriber.interface";
import { Result } from "src/common/domain/result-handler/result";
import { EventResponseDto } from "./dtos/event.response";

export abstract class IEventPublisher {
    protected subscribers: Map<string, IEventSubscriber<DomainEvent>[]>;

    constructor() {
        this.subscribers = new Map<string, IEventSubscriber<DomainEvent>[]>();
    }

    abstract publish(events: DomainEvent[]): Promise<Result<EventResponseDto>[]>;

    private includes(event: string, subscriber: IEventSubscriber<DomainEvent>): boolean {
        if (this.subscribers.has(event)) return this.subscribers.get(event).includes(subscriber);
        return false;
    }

    subscribe(event: string, subscribers: IEventSubscriber<DomainEvent>[]): void {
        this.subscribers.set(event, subscribers);
    }

    unSubscribe(event: string, subscriber: IEventSubscriber<DomainEvent>): void {
        if (this.includes(event, subscriber)) this.subscribers.set(event, this.subscribers.get(event).filter(sub => sub !== subscriber));
    }
}