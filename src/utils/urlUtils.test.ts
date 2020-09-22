import {serializeQuery} from "./urlUtils";

describe('urlUtils', () => {
    it('should return serialized query from object',  ()=>{
       expect(serializeQuery({
           limit: 10,
           offset: 0,
           q: 'awesome'
       })).toBe('limit=10&offset=0&q=awesome')
    });
});
