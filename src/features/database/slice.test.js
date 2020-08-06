import slice, { openDatabase, itemAction, DATABASE_STATUS } from "./slice"

describe("database/reducer", () => {
  test("default state", () => {
    expect(slice(undefined, {})).toEqual({})
  })

  test("database/changed", () => {
    const action = {
      type: "database/changed",
      meta: { arg: { databaseName: "generic" } },
      payload: { items: ["item1", "item2"] },
    }

    // Without initial state
    expect(() => {
      slice(undefined, action)
    }).toThrow("Cannot set property 'items' of undefined")

    // With initial state
    expect(
      slice(
        {
          generic: {
            status: DATABASE_STATUS.OPENING,
            items: [],
            pendingByItemId: {},
            errorsByItemId: {},
          },
        },
        action
      )
    ).toEqual({
      generic: {
        // Note that status is set by openDatabase.fulfilled
        status: DATABASE_STATUS.OPENING,
        items: ["item1", "item2"],
        pendingByItemId: {},
        errorsByItemId: {},
      },
    })
  })

  describe("database/open", () => {
    test("pending", () => {
      const action = {
        type: openDatabase.pending,
        meta: { arg: { databaseName: "generic" } },
      }

      // Without initial state
      expect(slice(undefined, action)).toEqual({
        generic: {
          status: DATABASE_STATUS.OPENING,
          errors: [],
          items: [],
          pendingByItemId: {},
          errorsByItemId: {},
        },
      })

      // With initial state
      expect(
        slice(
          {
            generic: {
              status: DATABASE_STATUS.OPENED,
              items: [],
              pendingByItemId: {},
              errorsByItemId: {},
            },
          },
          action
        )
      ).toEqual({
        generic: {
          status: DATABASE_STATUS.OPENING,
          items: [],
          pendingByItemId: {},
          errorsByItemId: {},
        },
      })
    })

    test("fulfilled", () => {
      const action = {
        type: openDatabase.fulfilled,
        meta: { arg: { databaseName: "generic" } },
      }

      // Without initial state
      expect(() => {
        slice(undefined, action)
      }).toThrow("Cannot set property 'status' of undefined")

      // With initial state
      expect(
        slice(
          {
            generic: {
              status: DATABASE_STATUS.OPENED,
              items: [],
              pendingByItemId: {},
              errorsByItemId: {},
            },
          },
          action
        )
      ).toEqual({
        generic: {
          status: DATABASE_STATUS.OPENED,
          items: [],
          pendingByItemId: {},
          errorsByItemId: {},
        },
      })
    })

    test("rejected", () => {
      const action = {
        type: openDatabase.rejected,
        meta: { arg: { databaseName: "generic" } },
        error: { message: "Something went wrong" },
      }

      // Without initial state
      expect(() => {
        slice(undefined, action)
      }).toThrow("Cannot set property 'status' of undefined")

      // With initial state
      expect(
        slice(
          {
            generic: {
              status: DATABASE_STATUS.OPENING,
              errors: [],
              items: [],
              pendingByItemId: {},
              errorsByItemId: {},
            },
          },
          action
        )
      ).toEqual({
        generic: {
          status: DATABASE_STATUS.ERROR,
          errors: [{ message: "Something went wrong" }],
          items: [],
          pendingByItemId: {},
          errorsByItemId: {},
        },
      })
    })
  })

  describe("database/item", () => {
    const meta = {
      requestId: "requestId1",
      arg: {
        databaseName: "generic",
        itemId: "item1",
        item: "item",
      },
    }

    test("pending", () => {
      const action = {
        type: itemAction.pending,
        meta,
      }

      // Without initial state
      expect(() => {
        slice(undefined, action)
      }).toThrow("Cannot read property 'pendingByItemId' of undefined")

      // With initial state
      expect(
        slice(
          {
            generic: {
              status: DATABASE_STATUS.OPENED,
              items: [],
              pendingByItemId: {},
              errorsByItemId: {},
            },
          },
          action
        )
      ).toEqual({
        generic: {
          status: DATABASE_STATUS.OPENED,
          items: [],
          pendingByItemId: {
            // Pending added
            item1: [{ requestId: "requestId1", itemId: "item1", item: "item" }],
          },
          errorsByItemId: {},
        },
      })
    })

    test("fulfilled", () => {
      const action = {
        type: itemAction.fulfilled,
        meta,
      }

      // Without initial state
      expect(() => {
        slice(undefined, action)
      }).toThrow("Cannot read property 'pendingByItemId' of undefined")

      // With initial state
      expect(
        slice(
          {
            generic: {
              status: DATABASE_STATUS.OPENED,
              items: [],
              pendingByItemId: {
                item1: [
                  { requestId: "requestId0", itemId: "item1", item: "item" },
                  { requestId: "requestId1", itemId: "item1", item: "item" },
                  { requestId: "requestId2", itemId: "item1", item: "item" },
                ],
              },
              errorsByItemId: {},
            },
          },
          action
        )
      ).toEqual({
        generic: {
          status: DATABASE_STATUS.OPENED,
          items: [],
          pendingByItemId: {
            // Removed pending with correct request id
            item1: [
              { requestId: "requestId0", itemId: "item1", item: "item" },
              { requestId: "requestId2", itemId: "item1", item: "item" },
            ],
          },
          errorsByItemId: {},
        },
      })
    })

    test("rejected", () => {
      const action = {
        type: itemAction.rejected,
        meta,
        error: { message: "Something went wrong" },
      }

      // Without initial state
      expect(() => {
        slice(undefined, action)
      }).toThrow("Cannot read property 'pendingByItemId' of undefined")

      // With initial state
      expect(
        slice(
          {
            generic: {
              status: DATABASE_STATUS.OPENED,
              items: [],
              pendingByItemId: {
                item1: [
                  { requestId: "requestId0", itemId: "item1", item: "item" },
                  { requestId: "requestId1", itemId: "item1", item: "item" },
                  { requestId: "requestId2", itemId: "item1", item: "item" },
                ],
              },
              errorsByItemId: {},
            },
          },
          action
        )
      ).toEqual({
        generic: {
          status: DATABASE_STATUS.OPENED,
          items: [],
          pendingByItemId: {
            item1: [
              // Removed pending with correct request id
              { requestId: "requestId0", itemId: "item1", item: "item" },
              { requestId: "requestId2", itemId: "item1", item: "item" },
            ],
          },
          errorsByItemId: {
            item1: [
              {
                requestId: "requestId1",
                itemId: "item1",
                message: "Something went wrong",
              },
            ],
          },
        },
      })
    })
  })
})
