export namespace types {
	
	export class GenerateRequest {
	    title: string;
	    notes: string;
	
	    static createFrom(source: any = {}) {
	        return new GenerateRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.notes = source["notes"];
	    }
	}
	export class GenerateResponse {
	    output: string;
	    elapsedMs: number;
	
	    static createFrom(source: any = {}) {
	        return new GenerateResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.output = source["output"];
	        this.elapsedMs = source["elapsedMs"];
	    }
	}

}

