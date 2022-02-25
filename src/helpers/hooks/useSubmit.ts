// import React from 'react'
// import moment from 'moment'

// export default function useSubmit() {

//     const onFlowSave = async () => {
//          // confirmation -> what to update? description, title
//         // check wallet

//         // do transaction -> pop up wallet
//         //show loading saving

//         const ACCOUNT = dataWallet?.accountId

//         const submitElements = elements.map(item => {
//             const { data, ...restItem } = item
//             // console.log(item, 'ITEM SUBMIT')
//             return {
//                 ...restItem,
//                 data: { label: item?.detail?.title },
//                 position: nodes.find(n => n.id === item?.id)?.__rf?.position
//             }
//         })

//         // versions array shouldn't be updated here
//         // if isCreate -> versions[] else versionsSuggested[]
//         // if isCreate -> update currentVersion

//         const commitFlow = {
//             ...currentFlow?.currentVersion,
//             // description: "",
//             // title: '', //versionName
//             // approvedAt: '',
//             // approvedBy: '',
//             createdBy: ACCOUNT,
//             createdAt: moment().unix(),
//             sequence: isCreate ? 0 : currentFlow?.sequence + 1, //automated versioning
//             elements: submitElements,
//             pools: [], //grant or bounty pools ??
//         }
//         // prevElement, prevIPFS}

//         // list of main versions
//         const prevVersions = !isCreate ? currentFlow?.versions : []
//         //isCreate?
//         prevVersions.unshift(commitFlow)
//         const versions = prevVersions

//         const prevVersionsSuggestion = currentFlow?.versionSuggested;
//         prevVersionsSuggestion.unshift(commitFlow)
//         const versionSuggested = prevVersionsSuggestion

//         //
//         console.log(
//             currentFlow,
//             currentFlow?.versionByUser, `currentFlow?.versionByUser`)

//         //  construct  data in proper way
//         const prevVersionByUser = currentFlow?.versionByUser[ACCOUNT] || []
//         prevVersionByUser.unshift(commitFlow)

//         // save version in user format
//         const versionByUser = {
//             ...currentFlow.versionByUser,
//             [ACCOUNT]: prevVersionByUser
//         }

//         console.log(
//             `prevVersions`, prevVersions,
//             `versions->`, versions,
//             `versionByUser->`, versionByUser,
//             currentFlow?.versionByUser[ACCOUNT], `currentFlow?.versionByUser[dataWallet?.accountId]`
//         )

//         // only for first creating
//         const forCreation = {
//             createdAt: moment().unix(),
//             currentVersion: commitFlow,
//             versions,
//         }
//         // only for updating -> all version must be approved first
//         const forUpdating = {
//             versionSuggested
//         }

//         const payloadFlow = {
//             ...currentFlow,
//             versionByUser,
//             // elements: submitElements,
//             updatedBy: ACCOUNT,
//             updatedAt: moment().unix(),
//             ...(isCreate ? forCreation : forUpdating)
//         }

//         console.log(payloadFlow, 'payloadflow', typeof payloadFlow)
//         try {
//             // await window.localStorage.setItem("flows", JSON.stringify(payloadFlow))
//             await store.set('flows', payloadFlow)
//             alert("Success add ? or Save?")

//         } catch (error) {
//             console.log(error)
//         }

//         setEditStatus(false)
//         setLock();
//         if (!isCreate) alert('u just add a versions') //shows notif of version
//         if (isCreate) router.push(`/`)

//     }

//     return {

//     }
// }
