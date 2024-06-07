import { ICodeGen } from "src/common/application/code-gen/code-gen.interface";

export class CodeGenMath implements ICodeGen {
    genCode(): number {
        return Math.floor(Math.random() * 10000);
    }

}