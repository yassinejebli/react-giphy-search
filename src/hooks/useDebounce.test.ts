import {act, renderHook} from "@testing-library/react-hooks";
import useDebounce from "./useDebounce";

jest.useFakeTimers();

describe('useDebounce', () => {
    it('should update value after delay passes',  ()=>{
        const delay = 500;
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'awesom', delay: delay } }
        );

        expect(result.current).toBe('awesom');

        rerender({value: 'awesome', delay: delay});
        act( ()=>{
            jest.runTimersToTime(delay);
        });

        expect(result.current).toBe('awesome');
    });
});
