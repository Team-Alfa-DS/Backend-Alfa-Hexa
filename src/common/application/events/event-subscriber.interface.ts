import { DomainEvent } from "src/common/domain/domain-event";
import { Result } from "src/common/domain/result-handler/result";
import { EventResponseDto } from "./dtos/event.response";

export interface IEventSubscriber<T extends DomainEvent> {
    on(event: T): Promise<Result<EventResponseDto>>;
}