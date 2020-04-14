import reducer from '../reducer';
import actionTypes from '../actionTypes';

describe('sidebar reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isCollapse: false
    });
  });

  it('should handle TOGGLE_SIDEBAR_COLLAPSE', () => {
    expect(
      reducer(
        {
          isCollapse: false
        },
        {
          type: actionTypes.TOGGLE_SIDEBAR_COLLAPSE
        }
      )
    ).toEqual({
      isCollapse: true
    });
  });
});
