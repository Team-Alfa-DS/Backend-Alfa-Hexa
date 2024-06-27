import { DomainEvent } from "src/common/domain/domain-event";
import { Result } from "src/common/domain/result-handler/result";
import { EventResponseDto } from "./dtos/event.response";

export interface IEventSubscriber {
    on(event: DomainEvent): Promise<Result<EventResponseDto>>;
}