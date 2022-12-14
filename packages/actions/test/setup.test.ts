import chai, { assert } from "chai"
import chaiAsPromised from "chai-as-promised"
import { createS3Bucket, getBucketName } from "../src/index"
import {
    initializeAdminServices,
    initializeUserServices,
    signInAnonymouslyWithUser,
    deleteAdminApp,
    getStorageConfiguration
} from "./utils"
import { fakeCeremoniesData } from "./data/samples"

// Config chai.
chai.use(chaiAsPromised)

describe("Setup action", () => {
    // Sample data for running the test.
    let userId: string

    // Initialize admin and user services.
    const { adminFirestore, adminAuth } = initializeAdminServices()
    const { userApp, userFunctions } = initializeUserServices()

    // Get configs for storage.
    const { ceremonyBucketPostfix } = getStorageConfiguration()

    beforeEach(async () => {
        // Sign-in anonymously with the user.
        const { newUid } = await signInAnonymouslyWithUser(userApp)
        userId = newUid
    })

    it("should fail to create a sample ceremony without being a coordinator", async () => {
        const ceremonyData = fakeCeremoniesData.fakeCeremonyOpenedDynamic

        // Should return the bucket name.
        const bucket = getBucketName(ceremonyData.data.prefix, ceremonyBucketPostfix)

        assert.isRejected(createS3Bucket(userFunctions, bucket))
    })

    it("should create a new ceremony", async () => {})
    it("should revert when given a malformed r1cs file", async () => {})
    it("should upload a file to s3", async () => {})
    it("should fail to upload to a non existent bucket", async () => {})
    it("should close a multi part upload", async () => {})
    it("should do a full multi part upload", async () => {})
    it("should return true for an existing object inside a bucket", async () => {})
    it("should return false for an non existing object inside a bucket", async () => {})
    it("should correctly estimate PoT given the number of constraints", async () => {})

    afterAll(async () => {
        // Clean ceremony and user from DB.
        await adminFirestore.collection("users").doc(userId).delete()

        // Remove Auth user.
        await adminAuth.deleteUser(userId)

        // Delete admin app.
        await deleteAdminApp()
    })
})
