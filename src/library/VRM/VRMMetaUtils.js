export function ToOutputVRMMeta(vrmMeta, icon, outputImage) {
    return {
        allowedUserName: vrmMeta.allowedUserName,
        author: vrmMeta.author,
        commercialUssageName: vrmMeta.commercialUssageName,
        contactInformation: vrmMeta.contactInformation,
        licenseName: vrmMeta.licenseName,
        otherLicenseUrl: vrmMeta.otherLicenseUrl,
        otherPermissionUrl: vrmMeta.otherPermissionUrl,
        reference: vrmMeta.reference,
        sexualUssageName: vrmMeta.sexualUssageName,
        texture: icon ? outputImage.length - 1 : undefined,
        title: vrmMeta.title,
        version: vrmMeta.version,
        violentUssageName: vrmMeta.violentUssageName,
    };
}
