### Local development with `frontend` app

By default, `frontend` uses the published version of `components`. To develop `components` locally, we need to instruct yarn to use the local version of `components` instead of the published version.

1. Go to `components`
1. `yarn link`
1. Go to `frontend`
1. `yarn link "@yogamifit/components"`
1. `cd node_modules/react && yarn link`
1. `cd ../@types/react && yarn link`
1. Go back to `components`
1. `yarn link "react" && yarn link "@types/react"`

During development, run `yarn build --watch` inside `components` to enable live reload.

**Explanation:** `yarn link` allows us to symlink to a local copy of `components`. However, `components` uses `react` and `@types/react`, and this causes a conflict with typescript and the bunder where they "see" two Reacts (one from `frontend`, one from `components`). To prevent this, we once again use `yarn link` to instruct `components` to use the copy of `react` and `@types/react` from `frontend` instead.
