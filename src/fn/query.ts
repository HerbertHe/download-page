import { request } from "@octokit/request"

import Cfg from "../../config-dl.json"

interface IReleaseAsset {
    name: string
    browser_download_url: string
    updated_at: string
    download_count: number
}

type ReleaseAssetsType = IReleaseAsset[]

interface IReleaseData {
    assets: ReleaseAssetsType
    body: string
    draft: boolean
    published_at: string
    tag_name: string
    prerelease: boolean
}

type ReleaseDatasType = IReleaseData[]

interface ISubscribledProjectRelease {
    name: string
    address: string
    data: ReleaseDatasType
}

// TODO 添加 GitHub 登录提高 rate
export const QueryData = () => {
    const { subscrible } = Cfg
    const releases = subscrible
        .map(async ({ name, owner, repo, from }) => {
            const res = await request(`GET /repos/${owner}/${repo}/releases`)
            const { status, data } = res
            if (status === 200) {
                return {
                    name,
                    address: from === "github"
                        ? `https://github.com/${owner}/${repo}`
                        : "",
                    data,
                } as ISubscribledProjectRelease
            }
        })

    return Promise.allSettled(releases).then(res => {
        return res[0]
    })
}
